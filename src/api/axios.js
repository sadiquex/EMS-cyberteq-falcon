import axios from "axios";

const API = axios.create({
  baseURL: "https://cyberteq-falcon-api.onrender.com/api",
});

// Request interceptor to add JWT token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
