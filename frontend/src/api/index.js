import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
},
});

const APIauthenticatedClient = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
},
});

// Add token to headers automatically
APIauthenticatedClient.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => Promise.reject(error)
);

export { apiClient, APIauthenticatedClient };
