import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  // `vite preview` é usado no Railway para servir o build estático;
  // libera os hosts *.railway.app (e custom domains) no healthcheck/produção.
  preview: {
    allowedHosts: true,
  },
});
