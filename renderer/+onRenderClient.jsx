// https://vike.dev/onRenderClient
export { onRenderClient };

import { createRoot } from "react-dom/client";
async function onRenderClient(pageContext) {
  const { Page } = pageContext;
  createRoot(document.getElementById("root")).render(<Page />);
}
