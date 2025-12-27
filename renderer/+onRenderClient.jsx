// https://vike.dev/onRenderClient
export { onRenderClient };

import { createRoot } from "react-dom/client";

const ROOT_URL = import.meta.env.BASE_URL;

async function onRenderClient(pageContext) {
  const { Page } = pageContext;
  createRoot(document.getElementById("root")).render(<Page />);
}
