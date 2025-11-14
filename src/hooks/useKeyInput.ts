import { useEffect, useState } from "react";

export function useKeyInputs() {
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    document.addEventListener("keyup", detectKeyUp);

    return () => {
      document.removeEventListener("keydown", detectKeyDown);
      document.removeEventListener("keyup", detectKeyUp);
    };
  });

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    const ak = [...activeKeys];
    ak.push(e.key);
    console.log(ak);
    setActiveKeys(ak);
    // console.log("clicked key: ", e.key);
  };

  const detectKeyUp = (e: KeyboardEvent) => {
    // console.log("released key: ", e.key);
    const ak = [...activeKeys];

    ak.splice(
      ak.findIndex((ak) => ak === e.key),
      1
    );
    console.log(ak);
    setActiveKeys(ak);
    1;

    // console.log(activeKeys);
  };

  return activeKeys;
}
