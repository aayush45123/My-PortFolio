import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: "/My-PortFolio/", // Required for GitHub Pages
  plugins: [react()],

  // Define API URL directly (so .env is not needed anymore)
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(
      "https://my-portfolio-wxe8.onrender.com"
    ),
  },

  // Proxy only in development
  server: {
    proxy:
      mode === "development"
        ? {
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
          }
        : undefined,
  },
}));
