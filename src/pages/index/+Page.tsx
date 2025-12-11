import { StrictMode } from "react";
import App from "../../App.tsx";
import EffectsLayer from "../../components/EffectsLayer.tsx";
import "./App.css";
import "./Page.css";

export { Page };

function Page() {
  return (
    <StrictMode>
      <EffectsLayer>
        <App />
        <noscript className="text-sm text-yellow-500">
          This page requires javascript to run
        </noscript>
      </EffectsLayer>
    </StrictMode>
  );
}
