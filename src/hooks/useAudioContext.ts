import { useEffect, useState } from "react";
import Tone from "../utils/audio.ts";

export function useAudioUnlock() {
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);

  useEffect(() => {
    //check isAudioUnlocked periodically, if so set
    async function checkAudioUnlocked() {
      const ctx = Tone.getContext();
      if (ctx && ctx.state === "running") {
        setIsAudioUnlocked(true);
        clearInterval(interval);
      }
    }
    const time = isAudioUnlocked ? 1000 : 250;
    const interval = window.setInterval(checkAudioUnlocked, time);
    return () => clearInterval(interval);
  }, [isAudioUnlocked]);

  return { isAudioUnlocked };
}
