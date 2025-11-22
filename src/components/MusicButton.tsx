import { useEffect } from "react";
import { useFX } from "../Contexts/EffectsLayerContext";
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
  const { spawnParticle } = useFX();

  useEffect(() => {
    if (active) {
      spawnParticle(activationColor);
      playNote(note, instrument);
    }
  }, [spawnParticle, active, instrument, note, activationColor]);

  const bgcol = colMap[activationColor].bg;

  return (
    <div
      className={`select-none  ${className} ${
        active ? `${bgcol} text-black sm:opacity-100` : "text-blue-500"
      } `}
      onClick={() => playNote(note, "piano")}
      onTouchStart={(e) => {
        e.preventDefault();
        playNote(note, "piano");
      }}
    >
      {note}
    </div>
  );
};
