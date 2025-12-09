import { useEffect, useState } from "react";

export function useIsOnline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [effectiveNetworkType, setEffectiveNetworkType] = useState(
    navigator?.connection?.effectiveType
  );

  useEffect(() => {
    const handleIsOffline = () => setIsOnline(false);
    const handleIsOnline = () => setIsOnline(true);

    window.addEventListener("online", handleIsOnline);
    window.addEventListener("offline", handleIsOffline);

    return () => {
      window.removeEventListener("online", handleIsOnline);
      window.removeEventListener("offline", handleIsOffline);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (navigator?.connection && navigator?.connection?.effectiveType) {
        setEffectiveNetworkType(navigator?.connection?.effectiveType);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log(isOnline);
  return { isOnline, effectiveNetworkType };
}
