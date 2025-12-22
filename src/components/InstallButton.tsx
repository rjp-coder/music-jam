import { useState, useEffect } from "react";

export const InstallButton = ({ className }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
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
  return (
    <>
      <p>{"deferredPromptExists:" + !!deferredPrompt}</p>
      <button className={className} onClick={() => handleAppInstall()}>
        Install as App
      </button>
    </>
  );
};
