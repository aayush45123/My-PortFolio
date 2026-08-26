import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [react()],

  // Define API URL for production build
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(
      mode === "production" ? "https://my-portfolio-wxe8.onrender.com" : ""
    ),
  },

  // Local development proxy to backend
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
