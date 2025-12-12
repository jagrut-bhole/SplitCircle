import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    },
    withCredentials : true
})

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const status = error.response?.status;
        const errorData = error.response?.data;

        switch(status) {
            case 401 : 
                // TODO : implement the logout using zustland
                window.dispatchEvent(new CustomEvent('auth:unauthorized'));
                localStorage.removeItem('user');
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                break;

            case 403:
                // toast.error("You don't have permission to perform this action");
                console.error("Forbidden : You do not have permission.");
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
                console.log("Unhandled error: ", error.message)
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