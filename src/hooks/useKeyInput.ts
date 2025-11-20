import { useEffect, useState } from "react";

export function useKeyInputs() {
  const [activeKeys, setActiveKeys] = useState([]);

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

    // console.log(activeKeys);
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    document.addEventListener("keyup", detectKeyUp);

    return () => {
      document.removeEventListener("keydown", detectKeyDown);
      document.removeEventListener("keyup", detectKeyUp);
    };
  });

  return activeKeys;
}

export const keyIndexMap = {
  z: 0,
  x: 1,
  c: 2,
  v: 3,
  b: 4,
  n: 5,
  m: 6,
  ",": 7,
  ".": 8,
  a: 9,
  s: 10,
  d: 11,
  f: 12,
  g: 13,
  h: 14,
  j: 15,
  k: 16,
  l: 17,
  q: 18,
  w: 19,
  e: 20,
  r: 21,
  t: 22,
  y: 23,
  u: 24,
  i: 25,
  o: 26,
  "1": 27,
  "2": 28,
  "3": 29,
  "4": 30,
  "5": 31,
  "6": 32,
  "7": 33,
  "8": 34,
  "9": 35,
};
