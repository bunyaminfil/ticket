import axios from "axios";

// Base URL and timeout can be configured via environment variables for React.
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // Example: Your React environment variable for the base URL
    timeout: 5000, // Optional: Timeout for requests (in ms)
    headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage (or any other storage mechanism)
        config.headers.Authorization = `Basic ${process.env.REACT_APP_API_CLIENT_TOKEN}`;
        return config;
    },
    (error) => {
        // Handle any errors with the request setup
        return Promise.reject(error);
    },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Directly return the response data
        return response.data;
    },
    (error) => {
        // Handle specific errors such as unauthorized access (401)
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized, redirecting to login...");

            // Optional: Log out the user or redirect to the login page
            localStorage.removeItem("token"); // Clear token if unauthorized
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error.response ? error.response.data : error);
    },
);

export default axiosInstance;
