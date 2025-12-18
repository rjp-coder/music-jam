export const BrowserCheck = () => {
  const browser = navigator ? navigator.userAgent.toLowerCase() : "unknown";
  const thisIsABrowser = globalThis.window;
  let browserType = "";
  if (browser.includes("firefox")) {
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

  return (
    <div className="bg-amber-300 border-2 border-black text-black rounded-sm p-2 mb-2">
      <p>
        {`It looks like you are using ${
          browserType ? titleCase(browserType) : " an unknown browser"
        }. Chrome is recommended when using Gamepads and the Gamepad API.`}
      </p>
    </div>
  );
};

function titleCase(str: string) {
  const firstLetter = str.charAt(0).toUpperCase();
  return firstLetter + str.slice(1);
}
