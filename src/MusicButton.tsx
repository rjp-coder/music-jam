import { useEffect } from "react";
import { playNote } from "./notes";

export const MusicButton = ({
  note,
  active,
  index,
}: {
  note: string;
  active: boolean;
  index: number;
}) => {
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
    const keyIndexMap = {
      "1": 0,
      "2": 1,
      "3": 2,
      "4": 3,
      "5": 4,
      "6": 5,
      "7": 6,
      "8": 7,
      "9": 8,
      "0": 9,
      "-": 10,
      "=": 11,
    };
    if (Object.keys(keyIndexMap).includes(e.key)) {
      const i = keyIndexMap[e.key];
      if (index === i) {
        playNote(note);
      }
    }
  };

  const detectKeyUp = (e: KeyboardEvent) => {
    // console.log("released key: ", e.key);
    // activeKeys.current.splice(
    //   activeKeys.current.findIndex((ak) => ak === e.key),
    //   1
    // );
    // console.log(activeKeys.current);
  };
  return (
    <div
      className={` p-1 border-white border-2 rounded-2xl min-w-16 max-w-16 max-h-10 m-2 cursor-pointer hover:bg-yellow-300 hover:text-black active:bg-yellow-500 ${
        active ? "bg-yellow-500 text-black" : "text-blue-500"
      }`}
      onClick={() => playNote(note)}
    >
      {note}
    </div>
  );
};
