import type { GamepadColors } from "../utils/gamepadColors.ts";
import type { Instruments } from "../utils/audio.ts";
import { ImgWithBackupText } from "./ImgWithBackupText.tsx";
import type { GamepadData } from "../hooks/useGamepad.ts";

const typeMap = {
  joycon: "bg-[url(/joycon.svg)]",
  xbox: "bg-[url(/xbox.svg)]",
  playstation: "bg-[url(/playstation.svg)]",
  unknown: "bg-[url(/unknown.svg)]",
};

const instrumentMap = {
  piano: "piano-icon.png",
  guitar: "guitar-icon.png",
  harp: "harp-icon.png",
  flute: "flute-icon.png",
  saxophone: "saxophone-icon.png",
  xylophone: "xylophone-icon.png",
};

export const GamePad = ({
  index,
  type,
  colClass,
  instrument,
  incrementCol,
  incrementInstrument,
}: {
  id: string;
  index: number;
  type: GamepadData["type"];
  colClass: GamepadColors[keyof GamepadColors];
  instrument: keyof Instruments;
  incrementCol: () => void;
  incrementInstrument: () => void;
}) => {
  return (
    <div
      onClick={() => {
        incrementInstrument();
      }}
      className={`border ${colClass.border} cursor-pointer rounded-xl w-24 h-24 mt-8 ${typeMap[type]}`}
    >
      {type}
      <div
        onClick={(e) => {
          e.stopPropagation();
          incrementCol();
        }}
        className={`cursor-pointer m-1 float-right h-4 w-4 border rounded-full ${colClass.bg}`}
      ></div>
      <div className={` m-1 absolute h-4 w-4 text-xs`}>{index}</div>
      <ImgWithBackupText
        imgClassName="w-16 h-16 m-auto"
        src={instrumentMap[instrument]}
        backupText={instrument}
        textClassName="text-xs"
      />
    </div>
  );
};
