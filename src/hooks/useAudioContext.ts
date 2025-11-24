import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useEffectEvent,
} from "react";

export function useAudioUnlock() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);

  const ensureCtx = useEffectEvent(() => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AC();
    }
    return audioCtxRef.current;
  });

  useEffect(() => {
    //check isAudioUnlocked periodically, if so set
    async function checkAudioUnlocked() {
      const ctx = ensureCtx();
      try {
        await ctx.resume();
      } catch {
        // some browsers throw if resume() is not allowed
      }
      if (ctx && ctx.state === "running") {
        console.log("audio context is running");
        setIsAudioUnlocked(true);
        clearInterval(interval);
      } else {
        console.log("audio context is not running");
      }
    }
    const time = isAudioUnlocked ? 250 : 1000;
    const interval = window.setInterval(checkAudioUnlocked, time);
    return () => clearInterval(interval);
  }, [isAudioUnlocked]);

  return { isAudioUnlocked };
}
