import { useState } from "react";

export const GamePad = ({
  type,
  colClass,
  incrementCol,
}: {
  type: "xbox" | "joycon";
  colClass: string;
  incrementCol: Function;
}) => {
  //   const borderColMap = {
  //     red: "border-red-500",
  //     blue: "border-blue-600",
  //     yellow: "border-yellow-500",
  //     green: "border-green-500",
  //     purple: "border-purple-500",
  //     orange: "border-orange-600",
  //     pink: "border-pink-400",
  //     cyan: "border-cyan-400",
  //     lime: "border-lime-500",
  //   };

  return (
    <div className={`border border-${colClass.replace("bg-", "")} w-24 h-24`}>
      {type}
      <div
        onClick={() => incrementCol()}
        className={`m-1 float-right h-4 w-4 bg-pink border rounded-full  border-white ${colClass}`}
      ></div>
    </div>
  );
};
