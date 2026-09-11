import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Painel administrativo — roda numa porta diferente do site institucional.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  // `vite preview` serve o build estático no Railway; libera o domínio gerado.
  preview: {
    allowedHosts: true,
  },
});
