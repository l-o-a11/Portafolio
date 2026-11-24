import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
  // Three.js pesa bastante: va en el paquete de HeroScene, que se carga bajo demanda.
  build: { chunkSizeWarningLimit: 1100 },
});
