import { useEffect, useState } from "react";

/**
 * Only Chromium browsers support a navigator object with a connection.
 */
type ChromiumNavigator = Navigator & { connection?: { effectiveType: string } };
type EffectiveType = "slow-2g" | "2g" | "3g" | "4g";

export function useIsOnline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [effectiveNetworkType, setEffectiveNetworkType] =
    useState<EffectiveType>(
      (navigator as ChromiumNavigator).connection
        ?.effectiveType as EffectiveType
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
        setEffectiveNetworkType(
          chromiumNavigator.connection?.effectiveType as EffectiveType
        );
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return { isOnline, effectiveNetworkType };
}
