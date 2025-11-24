import { useContext, useEffect, useState } from "react";
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
import type { GamepadData } from "./useGamepad";
import { playNote } from "../utils/audio";
import { MusicalKeyContext } from "../AppContexts";
import { agnosticKeysClimbingTheScale } from "../components/MusicKeyDisplay";
import { getValidNotesInKey } from "../utils/notes";

export type GamepadInput = {
  nativeBtn: number;
  nativeLabel?: string;
  mapping: GamepadData["type"];
  btn: number;
  gamepadIndex: number;
  btnLabel?: string;
};

export function useGamepadInputs(): GamepadInput[] {
  const initialGamepadInputs: GamepadInput[] = [];
  const [gamepadInputs, setGamepadInputs] = useState(initialGamepadInputs);
  const musicalKey = useContext(MusicalKeyContext);

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

      const [controllerMapping, toAgnosticMapping] =
        getControllerMapping(joypadType);

      for (const index of pressed) {
        const buttonPressed = controllerMapping[index];
        const btn = toAgnosticMapping[buttonPressed];
        console.assert(
          btn >= 0 && btn < 32,
          "button mapping out of range",
          btn
        );

        const gpInput = {
          nativeBtn: index,
          mapping: joypadType,
          btn,
          gamepadIndex: gp.index,
        } as GamepadInput;
        newGamepadInputs.push(gpInput);
        //}
      }
      for (const abp of axisButtonsPressed) {
        const gpInput = {
          btn: abp,
          nativeBtn: abp,
          mapping: joypadType,
          gamepadIndex: gp.index,
        };
        newGamepadInputs.push(gpInput);
      }
    }
    if (JSON.stringify(gamepadInputs) != JSON.stringify(newGamepadInputs)) {
      console.log("NOT EQUAL");
      // console.log({
      //   gamepadInputs,
      //   newGamepadInputs,
      //   equal:
      //     JSON.stringify(gamepadInputs) == JSON.stringify(newGamepadInputs),
      // });

      //determine which inputs are new
      const newInputs: GamepadInput[] = newGamepadInputs.filter(
        (ngi) =>
          !gamepadInputs.find(
            (gi) => gi.btn === ngi.btn && gi.gamepadIndex === ngi.gamepadIndex
          )
      );

      //determine which inputs were stopped
      const stoppedInputs: GamepadInput[] = gamepadInputs.filter(
        (gpi) =>
          !newGamepadInputs.find(
            (ngi) =>
              ngi.btn === gpi.btn && ngi.gamepadIndex === gpi.gamepadIndex
          )
      );

      //add some labeling data (good for debugging controller mappings)
      [...newInputs, ...stoppedInputs].forEach((item) => {
        item.nativeLabel = getNativeControllerBtnLabel(
          item.mapping,
          item.nativeBtn
        );
        item.btnLabel = getAgnosticControllerBtnLabel(item.btn);
      });

      console.log(
        "New Inputs:\n" +
          newInputs.map(
            (ni) =>
              `${ni.mapping}: ${ni.nativeBtn} (${ni.nativeLabel}) => agnostic: ${ni.btn} (${ni.btnLabel})`
          ) || "<none>"
      );
      console.log(
        "Dropped Inputs:\n" +
          stoppedInputs.map(
            (si) =>
              `${si.mapping}:${si.nativeBtn}(${si.nativeLabel}=> agnostic:${si.btn}(${si.btnLabel})`
          ) || "<none>"
      );

      //for each new input, play note
      for (const ni of newInputs) {
        playNote(determineNote(musicalKey, ni.btnLabel), determineInstrument());
      }

      setGamepadInputs(newGamepadInputs);
    }
  }

  useEffect(() => {
    const interval = setInterval(handleInputs, 50);
    return () => clearInterval(interval);
  });
  return [gamepadInputs];
}

function getAgnosticControllerBtnLabel(index) {
  return Object.keys(agnosticController).find(
    (k) => agnosticController[k] == index
  );
}

function getNativeControllerBtnLabel(mapping, index) {
  const [controllerMapping] = getControllerMapping(mapping);
  return Object.keys(controllerMapping).find(
    (k) => controllerMapping[k] == index
  );
}

function getControllerMappings() {
  const maps = {
    joycon: [joyConMappings, joyConToAgnosticMappings],
    xbox: [xboxControllerMappings, xboxToAgnosticMappings],
    playstation: [psControllerMappings, psToAgnosticMappings],
    unknown: [xboxControllerMappings, xboxToAgnosticMappings], //hope for the best
  };
  return maps;
}

function getControllerMapping(type) {
  const maps = getControllerMappings();
  return maps[type];
}

function determineNote(musicalKey: string, agnosticControllerBtnLabel: string) {
  //Get button index on agnostic controller -- e.g. DPAD_DOWN  might equal 4
  const btn = agnosticController[agnosticControllerBtnLabel];
  //The inputs are placed along a scale -- E.g. DPAD_DOWN might be the first note in the scale
  //agnosticKeysClimbingTheScale is those inputs [4,7,1,2...] would mean 4(DPAD_DOWN) is the
  //first note of the scale, followed by 7(DPAD_RIGHT), then 1(LEFT_STICK_LEFT)
  //is the first note / input in the scale

  //figure out how far up the scale the input corresponds to
  const scalePosition = agnosticKeysClimbingTheScale.indexOf(btn);

  //starting from the octave below the "middle" 3 -- get all the notes going up
  //until we run out of controller inputs.
  const notes = getValidNotesInKey(
    musicalKey,
    "natural",
    0,
    agnosticKeysClimbingTheScale.length,
    3
  );

  return notes[scalePosition];
}

function determineInstrument() {
  return "piano";
}
