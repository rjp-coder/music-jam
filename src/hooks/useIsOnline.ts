import { useEffect, useState } from "react";

/**
 * Only Chromium browsers support a navigator object with a connection.
 */
type ChromiumNavigator = Navigator & { connection?: { effectiveType: string } };

export function useIsOnline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [effectiveNetworkType, setEffectiveNetworkType] = useState(
    (navigator as ChromiumNavigator).connection!.effectiveType
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
    const chromiumNavigator = navigator as ChromiumNavigator;
    const intervalId = setInterval(() => {
      if (
        chromiumNavigator.connection &&
        chromiumNavigator.connection?.effectiveType
      ) {
        setEffectiveNetworkType(chromiumNavigator.connection?.effectiveType);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log(isOnline);
  return { isOnline, effectiveNetworkType };
}
