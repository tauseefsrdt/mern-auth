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

export default API;
