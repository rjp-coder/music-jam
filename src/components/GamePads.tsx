import { useGamepad } from "../hooks/useGamepad";
import { GamePad } from "./GamePad";

export const Gamepads = ({ musicKey }) => {
  const { connectedGamePads, setConnectedGamePads, incrementCol, colMap } =
    useGamepad();
  return (
    <div className="flex flex-row gap-2 mt-2">
      {connectedGamePads.map((cgp, i) => (
        <GamePad
          key={cgp.id + `(${cgp.index})`}
          type={cgp.type}
          colClass={colMap[cgp.col]}
          incrementCol={() => incrementCol(cgp.id)}
        />
      ))}
    </div>
  );
};
