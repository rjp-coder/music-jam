import type { ColMap } from "../hooks/useGamepadData.ts";
import type { Instruments } from "../utils/audio.ts";

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
  type: "xbox" | "joycon" | "playstation";
  colClass: ColMap[keyof ColMap];
  instrument: keyof Instruments;
  incrementCol: Function;
  incrementInstrument: Function;
}) => {
  return (
    <div className={`border ${colClass.border} w-24 h-24`}>
      {type}
      <div
        onClick={() => incrementCol()}
        className={`cursor-pointer m-1 float-right h-4 w-4 border rounded-full ${colClass.bg}`}
      ></div>
      <div className={`cursor-pointer m-1 float-left h-4 w-4 text-xs`}>
        {index}
      </div>
      <p onClick={() => incrementInstrument()}>{instrument}</p>
    </div>
  );
};
