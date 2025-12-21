// https://vike.dev/onRenderClient
export { onRenderClient };

import { createRoot } from "react-dom/client";

const ROOT_URL = import.meta.env.BASE_URL;

async function onRenderClient(pageContext) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(`${ROOT_URL}/service-worker.js`)
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
