import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:8000/api',
    headers: {
        'Context-Type' : 'application/json'
    }
})

//adding the token to request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if(token) {
        config.headers.Authorization= `Bearer ${token}`
    }

    return config
})

export default api;