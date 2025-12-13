import axios from "axios";

const api = axios.create({
  baseURL: "https://my-portfolio-wxe8.onrender.com",
});

export default api;
