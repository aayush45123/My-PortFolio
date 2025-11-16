import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: "/My-PortFolio/", // 👈 REQUIRED for GitHub Pages
  plugins: [react()],

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
        : undefined, // 👈 Disable proxy in production
  },
}));
