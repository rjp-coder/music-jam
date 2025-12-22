import { useState, useEffect } from "react";

export const InstallButton = ({ className }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleEvent = (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleEvent);
    // return window.removeEventListener("beforeinstallprompt", handleEvent);
  });

  const handleAppInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the prompt
      });
    }
  };

  /*
    The beforeinstallprompt event is mostly just supported by chrome. 
  */
  if (!deferredPrompt)
    return (
      <p className="text-xs">
        This website is available as a desktop app and can work fully offline.
        The instructions for doing depend on your browser.
      </p>
    );
  return (
    <>
      <button className={className} onClick={() => handleAppInstall()}>
        Install as App
      </button>
    </>
  );
};
