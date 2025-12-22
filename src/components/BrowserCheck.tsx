import { useState } from "react";

export const BrowserCheck = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const browser = navigator.userAgent.toLowerCase();
  const thisIsABrowser = globalThis.window;
  let browserType = "";
  if (browser.includes("edg")) {
    //Not a typo -- this is geniunely what the user agent for edge calls itself (after spamming the other browser names first to obfuscate that it is edge. )
    browserType = "edge";
  } else if (browser.includes("firefox")) {
    browserType = "firefox";
  } else if (browser.includes("chrome")) {
    browserType = "chrome";
  } else if (browser.includes("opera")) {
    browserType = "opera";
  } else if (browser.includes("safari")) {
    browserType = "safari";
  }

  if (!thisIsABrowser) return;
  if (browserType == "chrome") return;
  if (isDismissed) return;

  return (
    <div className="relative bg-amber-300 border-2 border-black text-black rounded-sm p-2 mb-2 pr-4">
      <p className="text-left">
        {`It looks like you are using ${
          browserType ? titleCase(browserType) : " an unknown browser"
        }. Chrome is recommended when using Gamepads and the Gamepad API.`}
      </p>
      <button
        className="absolute right-0 top-0 cursor-pointer hover:bg-gray-800 hover:text-white leading-4 p-1"
        onClick={() => setIsDismissed(true)}
      >
        X
      </button>
    </div>
  );
};

function titleCase(str: string) {
  const firstLetter = str.charAt(0).toUpperCase();
  return firstLetter + str.slice(1);
}
