// https://vike.dev/onRenderClient
export { onRenderClient };

import { createRoot } from "react-dom/client";
async function onRenderClient(pageContext) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  }
  const { Page } = pageContext;
  createRoot(document.getElementById("root")).render(<Page />);
}
