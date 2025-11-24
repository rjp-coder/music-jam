import { useContext, useEffect } from "react";
import { ConnectedGamepadsContext } from "../AppContexts";
import { detectGamepadType } from "../utils/controller";
import {
  getNextAvailableColor,
  getNextAvailableInstrument,
  type ColMap,
} from "./useGamepadData";
import type { Instruments } from "../utils/audio";

export function useControllerDesync() {
  const { connectedGamePads: eventConnectedGamepads, setConnectedGamePads } =
    useContext(ConnectedGamepadsContext);
  function handleDesync() {
    const navigatorGamepads = navigator.getGamepads();
    if (!navigatorGamepads) return;
    const ng = navigatorGamepads.filter((g) => g && g.connected);
    if (!ng || !ng.length) return;
    const ecg = eventConnectedGamepads.filter((g) => g);
    console.log({ ng, ecg });
    // a desync happens if the event connected gamepads is missing an index that can be found by navigator.getGamepads
    // or if connected gamepads has an extra index that canno be found by navigator.getGamepads

    //check for desync
    const missingNgs = [];
    for (const g of ng) {
      if (!ecg.find((eg) => eg.index === g.index)) {
        missingNgs.push(g);
      }
    }

    //For controllers that are on screen but not found, we just need
    //Their ides to help delete them.
    const redundantEgsIds = [];
    for (const eg of ecg) {
      if (!ng.find((g) => g.index === eg.index)) {
        redundantEgsIds.push(eg.index);
      }
    }

    if (missingNgs.length > 0 || redundantEgsIds.length > 0) {
      console.log(
        `🔄 Desync detected! Missing from context: [${missingNgs.map(
          (mng) => mng.index
        )}]. Extra in context: [${redundantEgsIds}] . Overriding connected gamepads in context.`
      );
    }

    //Don't mutate state
    let newState = [...ecg];

    //remove redundant event connected game controllers
    newState = newState.filter((ecg) => !redundantEgsIds.includes(ecg.index));

    //for each gamepad found by navigator.getGamepads

    missingNgs.forEach((ng) => {
      const gamepad = {
        index: ng.index,
        type: detectGamepadType(ng),
        col: "red" as keyof ColMap,
        instrument: "piano" as keyof Instruments,
        id: ng.id,
        timestamp: ng.timestamp,
      };
      gamepad.col = getNextAvailableColor(newState, ng.index);
      gamepad.instrument = getNextAvailableInstrument(newState, ng.index);
      newState.push(gamepad);
    });
    setConnectedGamePads(newState);
  }

  useEffect(() => {
    const interval = setInterval(handleDesync, 2000);
    return () => clearInterval(interval);
  });
}
