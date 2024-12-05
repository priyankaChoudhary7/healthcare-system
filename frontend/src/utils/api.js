import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Attach token if the endpoint is not /login
    if (token && !config.url.endsWith("/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export const addPatientHistory = (formData) =>
  apiClient.post("/patients/history/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
