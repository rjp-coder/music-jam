import { useEffect, useState } from "react";
import {
  getNextAvailableInstrument,
  getNextAvailableColor,
  type ColMap,
} from "./useGamepadData";
import type { Instruments } from "../utils/audio";

globalThis.connectedGamepadsCache = [];

export type GamepadData = {
  index: number;
  type: "joycon" | "xbox" | "playstation" | "unknown";
  col: keyof ColMap;
  instrument: keyof Instruments;
  id: "string";
};

export function useGamepad() {
  const initialData: GamepadData[] = [];
  const [connectedGamePads, setConnectedGamePads] = useState(initialData);

  useEffect(() => {
    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

    function handleGamepadConnected(e) {
      gamepadHandler(e, true);
    }
    function handleGamepadDisconnected(e) {
      gamepadHandler(e, false);
    }

    function gamepadHandler(event, connected) {
      console.log(
        "Gamepad connection at index %d: %s. %d buttons, %d axes. %s",
        event.gamepad.index,
        event.gamepad.id,
        event.gamepad.buttons?.length,
        event.gamepad.axes?.length,
        connected
      );
      const eventGamepad = event.gamepad;
      // Note:
      // gamepad === navigator.getGamepads()[gamepad.index]

      let t: GamepadData["type"] = "unknown";
      if (eventGamepad.id.toLowerCase().includes("joy")) {
        t = "joycon";
      } else if (eventGamepad.id.toLowerCase().includes("xbox")) {
        t = "xbox";
      } else if (eventGamepad.id.toLowerCase().includes("playstation")) {
        t = "playstation";
      }

      const gamepad = {
        index: eventGamepad.index,
        type: t,
        col: "red",
        instrument: "piano",
        id: eventGamepad.id,
      };

      setConnectedGamePads((prevState) => {
        const deepCopy = JSON.parse(JSON.stringify(prevState));
        if (connected) {
          gamepad.col = getNextAvailableColor(prevState, eventGamepad.index);
          gamepad.instrument = getNextAvailableInstrument(
            prevState,
            eventGamepad.index
          );
          deepCopy.push(gamepad);
        } else {
          deepCopy.splice(
            deepCopy.findIndex((ns) => ns.id == eventGamepad.index),
            1
          );
        }
        return deepCopy;
      });
    }

    // // console.log({ notesToPlay });
    // function interactWithButtons() {
    //   const gamepads = navigator.getGamepads();
    //   if (!gamepads || !gamepads.length) {
    //     // console.log("polling failed");
    //     return;
    //   } else {
    //     // console.log("polling succeeded");
    //   }
    //   for (let i = 0; i < gamepads.length; i++) {
    //     const gp = gamepads[i];

    //     if (!gp) continue;

    //     // console.log("gamepad connected: ", gp.id);

    //     const buttons = gp?.buttons;
    //     const pressed = [];

    //     for (let j = 0; j < buttons.length; j++) {
    //       const btn = buttons[j];
    //       if (btn.pressed) {
    //         pressed.push(j);
    //       }
    //     }

    //     const newGamepadNotes = JSON.parse(JSON.stringify(gamepadNotes));

    //     for (let index of pressed) {
    //       console.log(index, " button is pressed");
    //       const buttonPressed = joyConMappings[index];
    //       console.log("button pressed: ", buttonPressed);
    //       const btn = joyConToAgnosticMappings[buttonPressed];
    //       console.log("mapped to agnostic button: ", btn);
    //       console.assert(
    //         btn >= 0 && btn < 20,
    //         "button mapping out of range",
    //         btn
    //       );
    //       const noteToPlay = notesToPlay[btn];
    //       if (noteToPlay) {
    //         playNote(noteToPlay);
    //         newGamepadNotes.push({ btn, gamepad: i });
    //       }
    //     }
    //     //setGamepadNotes(newGamepadNotes);
    //   }
    // }

    // const interval = setInterval(interactWithButtons, 100);
    return () => {
      //clearInterval(interval);
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener(
        "gamepaddisconnected",
        handleGamepadDisconnected
      );
    };
  });

  return {
    connectedGamePads,
    setConnectedGamePads,
    // gamepadNotes,
  };
}
