/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import versionPlugin from "./vitePlugins/version";
import vike from "vike/plugin";
import { VitePWA } from "vite-plugin-pwa";

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
    VitePWA({
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      injectRegister: "script",
      devOptions: { enabled: false },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
    versionPlugin(),
    vike({ prerender: true }),
  ],
  // test: { include: ["./src/**/*.test.tsx?"] },
});
