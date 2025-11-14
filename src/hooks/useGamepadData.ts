import { useState } from "react";

export function useGamepadData() {
  const [connectedGamePads, setConnectedGamePads] = useState([
    { id: 0, type: "joycon", col: "red" },
    { id: 1, type: "xbox", col: "blue" },
  ]);

  const colMap = {
    red: "bg-red-500",
    blue: "bg-blue-600",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-600",
    pink: "bg-pink-400",
    cyan: "bg-cyan-400",
    lime: "bg-lime-500",
  };

  const incrementCol = (gamepadId: number) => {
    const gamepadColorsInUse = connectedGamePads.map((c) => c.col);
    const usedIndicies = gamepadColorsInUse.map((col) =>
      Object.keys(colMap).findIndex((colMapKey) => colMapKey === col)
    );
    console.log(usedIndicies);
    const colorKeys = Object.keys(colMap);
    if (colorKeys.length === gamepadColorsInUse.length) {
      console.warn("no colours to choose from!");
      return;
    }
    const newState = JSON.parse(JSON.stringify(connectedGamePads));
    const gp = newState.find((cgp) => cgp.id === gamepadId);
    if (!gp) throw new Error("Could not find gamepad");
    const oldColIndex = Object.keys(colMap).findIndex(
      (colMapKey) => colMapKey === gp.col
    );
    let colIndex = oldColIndex;
    while (usedIndicies.includes(colIndex)) {
      colIndex = (colIndex + 1) % colorKeys.length;
    }
    console.log(colIndex);
    const newCol = colorKeys[colIndex];
    console.log("newColor is ", newCol);
    gp.col = newCol;
    setConnectedGamePads(newState);
  };

  return { connectedGamePads, setConnectedGamePads, incrementCol, colMap };
}
