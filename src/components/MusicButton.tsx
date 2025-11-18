import { useContext, useEffect } from "react";
import { MusicNoteAnimationsContext } from "../App";
import { colMap } from "../hooks/useGamepadData";
import { playNote, type Instruments } from "../utils/audio";

export const MusicButton = ({
  note,
  active,
  className,
  activationColor,
  instrument,
}: {
  note: string;
  active: boolean;
  className: string;
  activationColor: string;
  instrument: keyof Instruments;
}) => {
  const [musicNoteAnimations, setMusicNoteAnimations] = useContext(
    MusicNoteAnimationsContext
  );

  // const debouncedAnim = useDebounce(doMusicNoteAnimation, 200);
  useEffect(() => {
    if (active) {
      doMusicNoteAnimation();
      playNote(note, instrument);
    }
  }, [active]);

  function doMusicNoteAnimation() {
    //generate a unique id
    const id = activationColor;
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

  const colClass = colMap[activationColor];

  return (
    <div
      className={`${className} ${
        active ? `${colClass} text-black sm:opacity-100` : "text-blue-500"
      } `}
      onClick={() => playNote(note, "piano")}
    >
      {note}
    </div>
  );
};
