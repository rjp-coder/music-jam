import type { VitePWAOptions } from "vite-plugin-pwa";

const config: Partial<VitePWAOptions> = {
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
  manifest: false,
  registerType: "prompt",
  injectRegister: false,
  devOptions: {
    // N.B must be disabled in order to get vike to work!
    // enabled: false,
    // navigateFallback: "index.html",
    // suppressWarnings: true,
    // type: "module",
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  },
};

export default config;
