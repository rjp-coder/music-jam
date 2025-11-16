import { useContext, useEffect } from "react";
import { MusicNoteAnimationsContext } from "../App";
import { playNote } from "../utils/audio";

export const MusicButton = ({
  note,
  active,
  activatedByController,
  className,
}: {
  note: string;
  active: boolean;
  activatedByController: boolean;
  className: string;
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

  return (
    <div
      className={`${className} ${
        active
          ? activatedByController
            ? "bg-red-500 text-black"
            : "bg-yellow-500 text-black md:opacity-100"
          : "text-blue-500"
      } `}
      onClick={() => playNote(note)}
    >
      {note}
    </div>
  );
};
