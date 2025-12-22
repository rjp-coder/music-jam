import { useIsOnline } from "../hooks/useIsOnline";

export const NetworkStatus = () => {
  const { isOnline, effectiveNetworkType } = useIsOnline();
  const thisIsABrowser = globalThis.window;

  const isSlow = ["slow-2g", "2g", "3g"].includes(effectiveNetworkType);

  const offline = (
    <span className="text-red-700 dark:text-red-400">Offline</span>
  );

  const slow = (
    <span className=" text-amber-700 dark:text-amber-400">
      {effectiveNetworkType}
    </span>
  );
  const fast = (
    <span className="text-green-800 dark:text-green-400">
      {effectiveNetworkType || "Online"}
    </span>
  );
  const preRendering = <span className="text-amber-400">...</span>;

  let effectiveNetworkTypeElem = preRendering;
  if (thisIsABrowser) {
    if (isOnline) {
      if (isSlow) {
        effectiveNetworkTypeElem = slow;
      } else {
        effectiveNetworkTypeElem = fast;
      }
    } else {
      effectiveNetworkTypeElem = offline;
    }
  }

  return (
    <p className="text-sm font-bold">
      Internet Connection {effectiveNetworkTypeElem}
    </p>
  );
};
