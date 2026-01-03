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
    runtimeCaching: [
      {
        // Handle page navigations
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          networkTimeoutSeconds: 5,
          plugins: [
            {
              // When network truly fails → offline page
              handlerDidError: async () => {
                // Workbox runtime plugin context gives `event` and SW scope
                // @ts-ignore
                const cache = await caches.open("workbox-precache-v2"); // default precache cache name
                const cachedResponse = await cache.match("/offline.html");
                return cachedResponse;
              },
            },
          ],
        },
      },
    ],
    globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  },
};

export default config;
