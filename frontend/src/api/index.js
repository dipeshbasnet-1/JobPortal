import axios from "axios";

// Base URL 
const BASE_URL = "http://localhost:4000";

// Axios instance for public API requests
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Axios instance for authenticated requests
const APIAuthenticatedClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Automatically attach token for authenticated requests
APIAuthenticatedClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
            return config;
        },
    (error) => Promise.reject(error)
);

export { apiClient, APIAuthenticatedClient };
