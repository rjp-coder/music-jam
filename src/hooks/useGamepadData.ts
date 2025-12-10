import { instruments } from "../utils/audio.ts";
import type { GamepadColors } from "../utils/gamepadColors";
import { gamepadColors } from "../utils/gamepadColors";
import { useGamepad, type GamepadData } from "./useGamepad";

export type GamepadHookData = {
  connectedGamePads: GamepadData[];
  setConnectedGamePads: React.Dispatch<React.SetStateAction<GamepadData[]>>;
  incrementCol: (gamepadIndex: number) => void;
  incrementInstrument: (gamepadIndex: number) => void;
  gamepadColors: GamepadColors;
};

export function useGamepadData(): GamepadHookData {
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

  const incrementInstrument = (gamepadIndex: number) => {
    setConnectedGamePads((prevState) => {
      const gp = prevState.find((gp) => gp.index === gamepadIndex);
      if (!gp)
        throw new Error(
          "Trying to increment instrument. This function is only intended for already connected devices, but could not find the device"
        );
      const currentInstrumentIndex = Object.keys(instruments).indexOf(
        gp.instrument
      );
      const newInstrument = getNextInstrumentAfterIndex(currentInstrumentIndex);
      const deepCopy = JSON.parse(JSON.stringify(prevState));
      const gp2 = deepCopy.find((cgp) => cgp.index === gamepadIndex);
      gp2.instrument = newInstrument;
      return deepCopy;
    });
  };

  return {
    connectedGamePads,
    setConnectedGamePads,
    incrementCol,
    incrementInstrument,
    gamepadColors,
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
): keyof typeof gamepadColors {
  if (!connectedGamePads.length) return "red";
  const gamepadColorsInUse = connectedGamePads.map((c) => c.col);
  const usedIndicies = gamepadColorsInUse.map((col) =>
    Object.keys(gamepadColors).findIndex((colMapKey) => colMapKey === col)
  );

  const colorKeys = Object.keys(
    gamepadColors
  ) as (keyof typeof gamepadColors)[];
  if (colorKeys.length === gamepadColorsInUse.length) {
    console.warn("no colours to choose from!");
    return;
  }
  const newState = JSON.parse(JSON.stringify(connectedGamePads));
  const gp = newState.find((cgp) => cgp.index === gamepadIndex);
  const oldColIndex = gp
    ? Object.keys(gamepadColors).findIndex((colMapKey) => colMapKey === gp.col)
    : 0; //if this gamepad is not initialised, there is no currentColor to index. So give it the index of -1 (i.e. non-existant but will increment to 0) and grab the next one
  let colIndex = oldColIndex;
  while (usedIndicies.includes(colIndex)) {
    colIndex = (colIndex + 1) % colorKeys.length;
  }
  // console.log(colIndex);
  const newCol = colorKeys[colIndex];
  // console.log("newColor is ", newCol);
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
  const instrumentKeys = Object.keys(
    instruments
  ) as (keyof typeof instruments)[];
  if (instrumentKeys.length === gamepadInstrumentsInUse.length) {
    console.warn("no instruments to choose from! Choosing piano");
    return "piano";
  }
  const newState = JSON.parse(JSON.stringify(connectedGamePads));
  const gp = newState.find((cgp) => cgp.index === gamepadIndex);
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
  return newInstrument;
}

export function getNextInstrumentAfterIndex(instrumentIndex: number) {
  const instrumentKeys = Object.keys(
    instruments
  ) as (keyof typeof instruments)[];
  return instrumentKeys[(instrumentIndex + 1) % instrumentKeys.length];
}
