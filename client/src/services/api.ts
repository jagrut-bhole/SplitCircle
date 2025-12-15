import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { setAccesssToken, removeAccessToken, getAccesssToken } from "@/utils/token";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    },
    withCredentials : true // needed for refresh token cookie
});

api.interceptors.request.use(
    (config) => {
        const token = getAccesssToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
)

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue: Array<{resolve: (value?: any) => void, reject: (reason?: any) => void}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const errorData = error.response?.data;

        // Handle 401 - Try to refresh token
        if (status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await api.post('/auth/refresh',
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = response.data.accessToken;
                setAccesssToken(newAccessToken);
                
                // Update default headers
                api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                
                processQueue(null, newAccessToken);
                isRefreshing = false;
                
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;
                
                // Refresh failed - logout user
                removeAccessToken();
                useAuthStore.getState().logout();
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        // Handle other status codes
        switch(status) {
            case 403:
                console.error("Forbidden: You do not have permission.");
                break;

            case 404:
                console.error("Resource not found:", error.config?.url);
                break;
            
            case 400:
                return Promise.reject(error.response.data);

            case 500:
            case 502:
            case 503:
                console.error("Server error. Please try again later.");
                break;

            default:
                console.log("Unhandled error:", error.message);
        }

        return Promise.reject({
            status: status,
            message: errorData?.message || error.message || 'An error occurred',
            errors: errorData?.errors || null,
            originalError: error
        });
    }
)


/*

<Routes>
    <Route path="/404" element={<PageNotFound />} />
    <Route path="*" element={<PageNotFound />} />
</Routes>

*/