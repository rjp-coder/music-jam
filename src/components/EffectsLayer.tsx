import { animate } from "motion";
import { useRef } from "react";
import { FXContext } from "../Contexts/EffectsLayerContext";
import { getRandomParams, RandomMusicNote } from "./RandomMusicNoteVanillaJS";

export default function EffectsLayer({ children }) {
  const layerRef = useRef(null);

  function getWindowDimensions() {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    return {
      windowWidth,
      windowHeight,
    };
  }

  const spawnParticle = (mna) => {
    const { windowWidth, windowHeight } = getWindowDimensions();
    const rp = getRandomParams(windowHeight, windowWidth);
    const props = {
      className: "absolute overflow-visible",
      color: mna,
      ...rp,
    };
    const el = document.createElement("div");
    el.className = "particle";

    document.body.appendChild(el);

    //Append to layer
    const el2 = RandomMusicNote(props);
    console.log(el2);

    console.log(layerRef.current);
    layerRef.current.appendChild(el2);

    // Example: animate opacity and scale
    const controls = animate(1, 0, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => {
        el.style.opacity = v + "";
        el.style.transform = `scale(${v})`;
      },
      //onComplete: () => el.remove(),
    });
  };

  return (
    <FXContext value={{ spawnParticle }}>
      {children}
      <div ref={layerRef} className="effects-layer"></div>
    </FXContext>
  );
}
