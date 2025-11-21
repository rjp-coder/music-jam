import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import "./index.css";
import EffectsLayer from "./components/EffectsLayer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EffectsLayer>
      <App />
    </EffectsLayer>
  </StrictMode>
);
