import { useGamepadData } from "../hooks/useGamepadData";
import { GamePad } from "./GamePad";

export const Gamepads = ({ musicKey }) => {
  const { connectedGamePads, incrementCol, colMap } = useGamepadData();
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
            type={cgp.type}
            colClass={colMap[cgp.col]}
            incrementCol={() => incrementCol(cgp.index)}
          />
        ))}
    </div>
  );
};
