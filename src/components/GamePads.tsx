import { useContext } from "react";
import { ConnectedGamepadsContext } from "../AppContexts";
import { GamePad } from "./GamePad";
import { useControllerDesync } from "../hooks/useControllerDesync";

export const Gamepads = ({ musicKey }) => {
  const {
    connectedGamePads,
    incrementCol,
    incrementInstrument,
    gamepadColors,
  } = useContext(ConnectedGamepadsContext);
  useControllerDesync();
  //filter unknown gamepads if they share an id
  const legitimateGamePads = connectedGamePads;
  //filterUnknownGamepadDataIfIdSame(connectedGamePads);

  return (
    <div className="flex flex-row gap-2 mt-2">
      {legitimateGamePads
        .toSorted((cgpA, cgpB) => cgpB.index - cgpA.index)
        .map((cgp, i) => (
          <GamePad
            id={cgp.id}
            index={cgp.index}
            key={cgp.id + `(${cgp.index})`}
            instrument={cgp.instrument}
            //@ts-ignore
            type={cgp.type}
            colClass={gamepadColors[cgp.col]}
            incrementCol={() => incrementCol(cgp.index)}
            incrementInstrument={() => incrementInstrument(cgp.index)}
          />
        ))}
    </div>
  );
};
