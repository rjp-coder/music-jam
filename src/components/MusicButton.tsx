import { useEffect } from "react";
import { playNote } from "../utils/audio";

export const MusicButton = ({
  note,
  active,
  transformRow,
}: {
  note: string;
  active: boolean;
  transformRow?: string;
}) => {
  useEffect(() => {
    if (active) {
      playNote(note);
    }
  });

  const transformationClass = {
    top: " rotate-x-60 mt-20 mb-1 opacity-10 hover:opacity-100 active:opacity-100",
    bottom:
      " -rotate-x-60 -mt-40 mb-1 opacity-10 hover:opacity-100 active:opacity-100",
    high: "-mb-20",
    low: "-mt-20",
  };
  return (
    <div className={`${transformRow ? "perspective-50px" : "h-0 -mb-5"}`}>
      <div
        className={` p-1 border-white opacity border-2 rounded-2xl min-w-16 max-w-16 max-h-10 cursor-pointer hover:bg-yellow-300 hover:text-black  active:bg-yellow-500 ${
          active ? "bg-yellow-500 text-black opacity-100" : "text-blue-500"
        } ${transformRow ? transformationClass[transformRow] : ""}`}
        onClick={() => playNote(note)}
      >
        {note}
      </div>
    </div>
  );
};
