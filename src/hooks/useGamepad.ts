import { useEffect } from "react";
import { joyConMappings, joyConToAgnosticMappings } from "../utils/controller";
import { playNote } from "../utils/notes";
import { useGamepadData, type GamepadData } from "./useGamepadData";

//TODO map this to the current key
const notesToPlay = {
  0: "F3",
  1: "G3",
  2: "A3",
  3: "B3",
  4: "C4",
  5: "D4",
  6: "E4",
  7: "F4",
  8: "G4",
  9: "A4",
  10: "B4",
  11: "C5",
  12: "D5",
  13: "E5",
  14: "F5",
  15: "G5",
  16: "A5",
  17: "B5",
  18: "C6",
  19: "D6",
};

export function useGamepad() {
  const { connectedGamePads, setConnectedGamePads, incrementCol, colMap } =
    useGamepadData();

  useEffect(() => {
    window.addEventListener("gamepadconnected", (e) => {
      gamepadHandler(e, true);
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      gamepadHandler(e, false);
    });

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

      const newState: Array<GamepadData> = JSON.parse(
        JSON.stringify(connectedGamePads)
      );

      let t: GamepadData["type"] = "unknown";
      if (eventGamepad.id.toLowerCase().includes("joy")) {
        t = "joycon";
      } else if (eventGamepad.id.toLowerCase().includes("xbox")) {
        t = "xbox";
      } else if (eventGamepad.id.toLowerCase().includes("playstation")) {
        t = "playstation";
      }

      if (connected) {
        newState.push({ id: eventGamepad.index, type: t, col: "red" });
      } else {
        newState.splice(
          newState.findIndex((ns) => ns.id == eventGamepad.index),
          1
        );
      }
      setConnectedGamePads(newState);
      globalThis.connectedGamepads = newState;
    }

    function interactWithButtons() {
      const gamepads = navigator.getGamepads();
      if (!gamepads || !gamepads.length) {
        // console.log("polling failed");
        return;
      } else {
        // console.log("polling succeeded");
      }
      for (let i = 0; i < gamepads.length; i++) {
        const gp = gamepads[i];

        if (!gp) continue;

        // console.log("gamepad connected: ", gp.id);

        const buttons = gp?.buttons;
        const pressed = [];

        for (let j = 0; j < buttons.length; j++) {
          const btn = buttons[j];
          if (btn.pressed) {
            pressed.push(j);
          }
        }

        for (let index of pressed) {
          console.log(index, " button is pressed");
          const buttonPressed = joyConMappings[index];
          console.log("button pressed: ", buttonPressed);
          const btn = joyConToAgnosticMappings[buttonPressed];
          console.log("mapped to agnostic button: ", btn);
          console.assert(
            btn >= 0 && btn < 20,
            "button mapping out of range",
            btn
          );
          const noteToPlay = notesToPlay[btn];
          if (noteToPlay) {
            playNote(noteToPlay);
          }
        }
      }
    }

    setInterval(interactWithButtons, 100);
  }, []);

  return { connectedGamePads, setConnectedGamePads, incrementCol, colMap };
}
