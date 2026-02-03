import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/se_project_news-explorer/",
  server: {
    port: 3000,
  },
});
