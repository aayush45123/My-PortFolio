import axios from "axios";

export const API_BASE = import.meta.env.DEV
  ? ""
  : (import.meta.env.VITE_API_URL || "https://my-portfolio-wxe8.onrender.com");

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
