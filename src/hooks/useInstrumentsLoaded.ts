import { useEffect, useState } from "react";
import { checkInstrumentsLoaded } from "../utils/audio";

export function useInstrumentsLoaded() {
  const [instruments, setInstruments] = useState(checkInstrumentsLoaded());

  function getProgress() {
    const loaded = Object.entries(instruments).filter(
      (kv) => instruments[kv[0]]
    ).length;
    const total = Object.keys(instruments).length;
    return { loaded, total };
  }

  useEffect(() => {
    if (!Object.values(instruments).includes(false)) {
      //if everything is loaded, return early.
      return;
    }
    const intervalId = setInterval(() => {
      const il = checkInstrumentsLoaded();
      if (JSON.stringify(il) !== JSON.stringify(instruments)) {
        setInstruments(il);
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [instruments]);

  function isLoading() {
    return Object.values(instruments).includes(false);
  }

  return { instruments, isLoading, getProgress };
}
