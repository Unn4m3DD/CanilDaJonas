import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["realm-web"],
  },
  build: {
    rollupOptions: {
      input: {
        app: "./public/index.html", // default
      },
    },
  },
  base: '/CanilDaJonas'
});
