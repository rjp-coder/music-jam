import { useEffect } from "react";
import { useFX } from "../Contexts/EffectsLayerContext";
import { playNote, type Instruments } from "../utils/audio";
import { colMap, type ColMap } from "../hooks/useGamepadData";

export const MusicButton = ({
  note,
  active,
  className,
  activationColor,
  instruments,
}: {
  note: string;
  active: boolean;
  className: string;
  activationColor: (keyof ColMap)[];
  instruments: (keyof Instruments)[];
}) => {
  const { spawnParticle } = useFX();

  useEffect(() => {
    if (active) {
      console.log("spawning particle of color ", activationColor[0]);
      for (const col of activationColor) {
        spawnParticle(col);
      }
      for (const instrument of instruments) {
        playNote(note, instrument);
      }
    }
  }, [spawnParticle, active, instruments, note, activationColor]);

  const bgCol = `${activationColor
    .map((ac) => `var(${colMap[ac]?.color})`)
    .join(", ")}`;

  return (
    <div
      style={
        active && activationColor.length > 1
          ? {
              background: `linear-gradient(to right, ${bgCol})
              `,
            }
          : {}
      }
      className={`select-none  ${className} ${
        active ? ` text-black sm:opacity-100` : "text-blue-500"
      } ${
        active && activationColor.length == 1
          ? colMap[activationColor[0]].bg
          : ""
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
