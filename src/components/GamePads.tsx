import { useContext } from "react";
import { ConnectedGamepadsContext } from "../AppContexts";
import { GamePad } from "./GamePad";
import { useControllerDesync } from "../hooks/useControllerDesync";

export const Gamepads = () => {
  const {
    connectedGamePads,
    incrementCol,
    incrementInstrument,
    gamepadColors,
  } = useContext(ConnectedGamepadsContext);
  useControllerDesync();

  return (
    <div className="flex flex-row gap-2 mt-2">
      {connectedGamePads
        .toSorted((cgpA, cgpB) => cgpB.index - cgpA.index)
        .map((cgp) => (
          <GamePad
            id={cgp.id}
            index={cgp.index}
            key={cgp.id + `(${cgp.index})`}
            instrument={cgp.instrument}
            type={cgp.type}
            colClass={gamepadColors[cgp.col]}
            incrementCol={() => incrementCol(cgp.index)}
            incrementInstrument={() => incrementInstrument(cgp.index)}
          />
        ))}
    </div>
  );
};
