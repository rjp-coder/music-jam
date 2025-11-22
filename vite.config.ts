/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import versionPlugin from "./vitePlugins/version";

// https://vite.dev/config/
export default defineConfig({
  base: "/music-jam/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          tone: ["tone"],
        },
      },
    },
  },
  define: {
    __BUILD_VERSION__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [react(), tailwindcss(), visualizer(), versionPlugin()],
  // test: { include: ["./src/**/*.test.tsx?"] },
});
