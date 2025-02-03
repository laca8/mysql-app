import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    // "process.env": {},
    global: {},
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000/",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
