import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://my-portfolio-wxe8.onrender.com");

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
