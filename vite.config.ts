/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import versionPlugin from "./vitePlugins/version";
import vike from "vike/plugin";
import { VitePWA } from "vite-plugin-pwa";
import pwaConfig from "./pwa.config.ts";

// https://vite.dev/config/
export default defineConfig({
  base: "/music-jam/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/tone")) return "tone";
        },
      },
    },
  },
  define: {
    __BUILD_VERSION__: JSON.stringify(new Date().toISOString()),
  },
  ssr: {
    // Add problematic npm package here:
    noExternal: ["tone"],
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer(),
    VitePWA(pwaConfig),
    versionPlugin(),
    vike({ prerender: true }),
  ],
  // test: { include: ["./src/**/*.test.tsx?"] },
});
