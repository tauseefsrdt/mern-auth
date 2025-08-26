import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4200/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token; // already includes "Bearer"
  }
  return config;
});

// Handle expired/invalid token
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔑 Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default API;
