export const BrowserCheck = () => {
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
