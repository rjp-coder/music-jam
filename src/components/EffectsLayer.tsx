/* eslint-disable @typescript-eslint/no-unused-vars */
import { animate } from "motion";
import { useRef } from "react";
import { FXContext } from "../Contexts/EffectsLayerContext";
import {
  getRandomParams,
  RandomMusicNote,
} from "../animations/RandomMusicNoteVanillaJs";
import { chooseRandom } from "../utils/utils";

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
    console.log(rp);
    const props = {
      className: "absolute overflow-visible",
      color: mna,
      ...rp,
    };

    //Append to layer
    const el2 = RandomMusicNote(props);
    layerRef.current.appendChild(el2);

    // Example: animate opacity and scale
    const gravity = 0.5;
    const direction = chooseRandom([1, -1]);
    const distance = Math.random() * 150 + 100 * direction;
    const rotation = Math.floor(Math.random() * 30 + 50) * direction;

    //None of this is mathematically sound and it has been achieved through trial and error
    //The intent is to throw a note and have it follow a parabolic trajectory and fade out
    //as it shrinks

    //@ts-expect-error I'd rather know from a glance that animate has a return val
    const controls = animate(1, 0, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        const w = 1 - v;
        const x = distance * w;
        const y = ((5 * (-x) ** 2) / 100 - x * 4) * gravity;
        el2.style.opacity = v + "";
        el2.style.transformOrigin = "center";
        el2.style.transform = ` translateX(${x}px) translateY(${y}px) rotateZ(${
          w * rotation
        }deg) scale(${1 - w / 2})`;
      },
      onComplete: () => el2.remove(),
    });
  };

  return (
    <FXContext value={{ spawnParticle }}>
      {children}
      <div
        ref={layerRef}
        className="absolute pointer-events-none inset-0 overflow-visible"
      ></div>
    </FXContext>
  );
}
