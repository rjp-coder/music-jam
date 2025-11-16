import { useContext, useEffect } from "react";
import { MusicNoteAnimationsContext } from "../App";
import { playNote } from "../utils/audio";

export const MusicButtonOld = ({
  note,
  active,
  transformRow,
}: {
  note: string;
  active: boolean;
  transformRow?: string;
}) => {
  const [musicNoteAnimations, setMusicNoteAnimations] = useContext(
    MusicNoteAnimationsContext
  );

  // const debouncedAnim = useDebounce(doMusicNoteAnimation, 200);
  useEffect(() => {
    if (active) {
      doMusicNoteAnimation();
      playNote(note);
    }
  }, [active]);

  function doMusicNoteAnimation() {
    //generate a unique id
    const id = Math.random().toString(36).substring(2, 9);
    //add to music notes queue
    setMusicNoteAnimations([...musicNoteAnimations, id]);
    //remove from music notes queue(triggered immediately but takes some time to animate fade)
    setTimeout(
      () =>
        setMusicNoteAnimations((prev) =>
          prev.filter((noteId) => noteId !== id)
        ),
      20
    );
  }

  const transformationClass = {
    top: " md:rotate-x-60 md:mt-20 md:mb-1 md:opacity-10 hover:opacity-100 active:opacity-100",
    bottom:
      " md:-rotate-x-60 md:-mt-40 md:mb-1 md:opacity-10 hover:opacity-100 active:opacity-100",
    high: "md:-mb-20",
    low: "md:-mt-20",
  };
  return (
    <div
      className={`${transformRow ? "md:perspective-50px" : "md:h-0 md:-mb-5"}`}
    >
      <div
        className={` p-1 border-white border-2 rounded-2xl min-w-16 max-w-16 max-h-10 cursor-pointer hover:bg-yellow-300 hover:text-black  active:bg-yellow-500 ${
          active ? "bg-yellow-500 text-black md:opacity-100" : "text-blue-500"
        } ${transformRow ? transformationClass[transformRow] : ""}`}
        onClick={() => playNote(note)}
      >
        {note}
      </div>
    </div>
  );
};
