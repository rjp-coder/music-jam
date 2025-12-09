import { useFX } from "../Contexts/EffectsLayerContext";
import { playNote } from "../utils/audio";
import { gamepadColors, type GamepadColors } from "../utils/gamepadColors";

export const MusicButton = ({
  note,
  active,
  className,
  activationColor,
}: {
  note: string;
  active: boolean;
  className: string;
  activationColor: (keyof GamepadColors)[];
}) => {
  const bgCol = `${activationColor
    .map((ac) => `var(${gamepadColors[ac]?.color})`)
    .join(", ")}`;
  const { spawnParticle } = useFX();

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
          ? gamepadColors[activationColor[0]].bg
          : ""
      } `}
      onClick={() => playNote(note, "piano")}
      onTouchStart={(e) => {
        e.preventDefault();
        playNote(note, "piano");
        spawnParticle("yellow");
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
      }}
    >
      {note}
    </div>
  );
};
