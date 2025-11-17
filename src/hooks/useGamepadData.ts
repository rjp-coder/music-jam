import { instruments } from "../utils/audio";
import { useGamepad, type GamepadData } from "./useGamepad";

export const colMap = {
  red: "bg-red-600",

  blue: "bg-blue-600",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  pink: "bg-pink-400",
  cyan: "bg-cyan-400",
  lime: "bg-lime-500",
};

export type ColMap = typeof colMap;

export function useGamepadData() {
  const { connectedGamePads, setConnectedGamePads } = useGamepad();

  const incrementCol = (gamepadIndex: number) => {
    const newCol = getNextAvailableColor(connectedGamePads, gamepadIndex);
    setConnectedGamePads((prevState) => {
      const deepCopy = JSON.parse(JSON.stringify(prevState));
      const gp = deepCopy.find((cgp) => cgp.index === gamepadIndex);
      gp.col = newCol;
      return deepCopy;
    });
  };

  return {
    connectedGamePads,
    setConnectedGamePads,
    incrementCol,
    colMap,
  };
}

/**
 * Each gamepad can have an assigned colour but there are limited
 * colours available.
 *
 * This function finds the next "free" colour to use: that is to
 * say the next colour that is not occupied by another gamepad.
 *
 * @param connectedGamePads All connected gamepads
 * @param gamepadIndex The id of the gamepad whose colour we want to alter
 * @returns
 */
export function getNextAvailableColor(
  connectedGamePads: GamepadData[],
  gamepadIndex: number
): keyof typeof colMap {
  if (!connectedGamePads.length) return "red";
  const gamepadColorsInUse = connectedGamePads.map((c) => c.col);
  const usedIndicies = gamepadColorsInUse.map((col) =>
    Object.keys(colMap).findIndex((colMapKey) => colMapKey === col)
  );
  console.log(usedIndicies);
  const colorKeys = Object.keys(colMap) as (keyof typeof colMap)[];
  if (colorKeys.length === gamepadColorsInUse.length) {
    console.warn("no colours to choose from!");
    return;
  }
  const newState = JSON.parse(JSON.stringify(connectedGamePads));
  const gp = newState.find((cgp) => cgp.index === gamepadIndex);
  if (!gp) console.log("Setting colour for gamepad before initialisation");
  const oldColIndex = gp
    ? Object.keys(colMap).findIndex((colMapKey) => colMapKey === gp.col)
    : 0; //if this gamepad is not initialised, there is no currentColor to index. So give it the index of -1 (i.e. non-existant but will increment to 0) and grab the next one
  let colIndex = oldColIndex;
  while (usedIndicies.includes(colIndex)) {
    colIndex = (colIndex + 1) % colorKeys.length;
  }
  console.log(colIndex);
  const newCol = colorKeys[colIndex];
  console.log("newColor is ", newCol);
  return newCol;
}

/**
 * Each gamepad can have an assigned instrument but there are limited
 * colours available.
 *
 * This function finds the next "free" instrument to use: that is to
 * say the next instrument that is not occupied by another gamepad.
 *
 * @param connectedGamePads All connected gamepads
 * @param gamepadIndex The id of the gamepad whose instrument we want to alter
 * @returns
 */
export function getNextAvailableInstrument(
  connectedGamePads: GamepadData[],
  gamepadIndex: number
): keyof typeof instruments {
  if (!connectedGamePads.length) return "piano";
  const gamepadInstrumentsInUse = connectedGamePads.map((c) => c.instrument);
  const usedIndicies = gamepadInstrumentsInUse.map((instrument) =>
    Object.keys(instruments).findIndex(
      (instrumentKey) => instrumentKey === instrument
    )
  );
  console.log(usedIndicies);
  const instrumentKeys = Object.keys(
    instruments
  ) as (keyof typeof instruments)[];
  if (instrumentKeys.length === gamepadInstrumentsInUse.length) {
    console.warn("no instruments to choose from! Choosing piano");
    return "piano";
  }
  const newState = JSON.parse(JSON.stringify(connectedGamePads));
  const gp = newState.find((cgp) => cgp.index === gamepadIndex);
  if (!gp) console.log("Setting instrumnet for gamepad before initialisation");
  const oldInstrumentIndex = gp
    ? Object.keys(instruments).findIndex(
        (instrumentKey) => instrumentKey === gp.col
      )
    : 0; //if this gamepad is not initialised, there is no currentInstrument to index. So give it the index of -1 (i.e. non-existant but will increment to 0) and grab the next one
  let instrumentIndex = oldInstrumentIndex;
  while (usedIndicies.includes(instrumentIndex)) {
    instrumentIndex = (instrumentIndex + 1) % instrumentKeys.length;
  }
  console.log(instrumentIndex);
  const newInstrument = instrumentKeys[instrumentIndex];
  console.log("newInstrument is ", newInstrument);
  return newInstrument;
}
