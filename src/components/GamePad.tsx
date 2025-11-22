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
  colClass: string;
  instrument: keyof Instruments;
  incrementCol: Function;
  incrementInstrument: Function;
}) => {
  //Tailwind still reads this and generates the relevant util classes!
  //@ts-expect-error Fun fact -- this is true even if the below is commented
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const borderColMap = {
    red: "border-red-600",
    blue: "border-blue-600",
    yellow: "border-yellow-500",
    green: "border-green-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
    pink: "border-pink-400",
    cyan: "border-cyan-400",
    lime: "border-lime-500",
  };

  return (
    <div className={`border border-${colClass.replace("bg-", "")} w-24 h-24`}>
      {type}
      <div
        onClick={() => incrementCol()}
        className={`cursor-pointer m-1 float-right h-4 w-4 border rounded-full  border-white ${colClass}`}
      ></div>
      <div className={`cursor-pointer m-1 float-left h-4 w-4 text-xs`}>
        {index}
      </div>
      <p onClick={() => incrementInstrument()}>{instrument}</p>
    </div>
  );
};
