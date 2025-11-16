import { useEffect, useState } from "react";
import { joyConMappings, joyConToAgnosticMappings } from "../utils/controller";

export function useGamepadInputs() {
  const [gamepadInputs, setGamepadInputs] = useState([]);

  useEffect(() => {
    const interval = setInterval(handleInputs, 100);
    return () => clearInterval(interval);
  });

  function handleInputs() {
    const gamepads = navigator.getGamepads();
    if (!gamepads || !gamepads.length) {
      //   console.log("polling failed");
      return;
    } else {
      //   console.log("polling succeeded");
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

      const newGamepadInputs = [];

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
        //const noteToPlay = notesToPlay[btn];
        //if (noteToPlay) {
        //playNote(noteToPlay);
        newGamepadInputs.push({ btn, gamepad: i });
        //}
      }
      setGamepadInputs(newGamepadInputs);
    }
  }

  return gamepadInputs;
}
