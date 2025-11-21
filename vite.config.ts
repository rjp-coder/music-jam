/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  base: "/music-jam",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          tone: ["tone"],
        },
      },
    },
  },
  plugins: [react(), tailwindcss(), visualizer()],
  // test: { include: ["./src/**/*.test.tsx?"] },
});
