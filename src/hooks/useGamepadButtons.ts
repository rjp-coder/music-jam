import { useEffect, useState } from "react";
import {
  agnosticController,
  detectGamepadType,
  joyConMappings,
  joyConToAgnosticMappings,
  playstationControllerMappings as psControllerMappings,
  playstationToAgnosticMappings as psToAgnosticMappings,
  xboxControllerMappings,
  xboxToAgnosticMappings,
} from "../utils/controller";

export type GamepadInput = { btn: number; gamepadIndex: number };

export function useGamepadInputs(): GamepadInput[] {
  const initialGamepadInputs: GamepadInput[] = [];
  const [gamepadInputs, setGamepadInputs] = useState(initialGamepadInputs);

  function handleInputs() {
    const gamepads = navigator.getGamepads();
    if (!gamepads || !gamepads.length) {
      //   console.log("polling failed");
      return;
    } else {
      //   console.log("polling succeeded");
    }

    const newGamepadInputs: GamepadInput[] = []; //TODO don't make this empty, but
    //do filter it so that pre-existing inputs from this controller are
    //removed .
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

      const axisButtonsPressed = [];
      const axes = gp.axes;
      const threshold = 0.6; //threshold along the axis after which we would consider the stick to be pointing in a direction deliberately
      const wobbleFactor = 0.3; //threshold after which it is impossible to tell along which axis the sticks are being pressed (so don't process)
      const [leftX, leftY, rightX, rightY] = axes;
      if (leftX < -threshold && Math.abs(leftY) < wobbleFactor) {
        axisButtonsPressed.push(agnosticController.LEFT_STICK_LEFT);
      }
      if (leftX > threshold && Math.abs(leftY) < wobbleFactor) {
        axisButtonsPressed.push(agnosticController.LEFT_STICK_RIGHT);
      }
      if (leftY < -threshold && Math.abs(leftX) < wobbleFactor) {
        axisButtonsPressed.push(agnosticController.LEFT_STICK_UP);
      }
      if (leftY > threshold && Math.abs(leftX) < wobbleFactor) {
        axisButtonsPressed.push(agnosticController.LEFT_STICK_DOWN);
      }
      if (rightX < -threshold && Math.abs(rightY) < wobbleFactor) {
        axisButtonsPressed.push(agnosticController.RIGHT_STICK_LEFT);
      }
      if (rightX > threshold && Math.abs(rightY) < wobbleFactor) {
        axisButtonsPressed.push(agnosticController.RIGHT_STICK_RIGHT);
      }
      if (rightY < -threshold && Math.abs(rightX) < wobbleFactor) {
        axisButtonsPressed.push(agnosticController.RIGHT_STICK_UP);
      }
      if (rightY > threshold && Math.abs(rightX) < wobbleFactor) {
        axisButtonsPressed.push(agnosticController.RIGHT_STICK_DOWN);
      }

      const joypadType = detectGamepadType(gp);

      const maps = {
        joycon: [joyConMappings, joyConToAgnosticMappings],
        xbox: [xboxControllerMappings, xboxToAgnosticMappings],
        playstation: [psControllerMappings, psToAgnosticMappings],
        unknown: [xboxControllerMappings, xboxToAgnosticMappings], //hope for the best
      };

      const [controllerMapping, toAgnosticMapping] = maps[joypadType];

      for (const index of pressed) {
        console.log("" + index, " button is pressed");
        const buttonPressed = controllerMapping[index];
        const btn = toAgnosticMapping[buttonPressed];
        console.log(
          "mapped to agnostic button: ",
          btn,
          ": ",
          Object.keys(agnosticController).find(
            (k) => agnosticController[k] == btn
          )
        );
        console.assert(
          btn >= 0 && btn < 32,
          "button mapping out of range",
          btn
        );
        //const noteToPlay = notesToPlay[btn];
        //if (noteToPlay) {
        //playNote(noteToPlay);
        const gpInput = { btn, gamepadIndex: gp.index } as GamepadInput;
        newGamepadInputs.push(gpInput);
        //}
      }
      for (const abp of axisButtonsPressed) {
        console.log("" + abp, " button is pressed");
        console.log(
          Object.keys(agnosticController).find(
            (k) => agnosticController[k] == abp
          )
        );
        const gpInput = { btn: abp, gamepadIndex: gp.index };
        newGamepadInputs.push(gpInput);
      }
    }
    setGamepadInputs(newGamepadInputs);
  }

  useEffect(() => {
    const interval = setInterval(handleInputs, 50);
    return () => clearInterval(interval);
  });

  return gamepadInputs;
}
