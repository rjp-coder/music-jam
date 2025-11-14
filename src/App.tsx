import { useEffect, useRef, useState } from "react";
import { KeySelector } from "./KeySelector";
import { MusicButton } from "./MusicButton";
import { getValidNotesInKey, hello } from "./notes";
import { GamePad } from "./GamePad";

function App() {
  const [toneStarted, _] = useState(false);
  const activeKeys = useRef([]);
  const [musicKey, setMusicKey] = useState("C");
  const [connectedGamePads, setConnectedGamePads] = useState([
    { id: 0, type: "joycon", col: "red" },
    { id: 1, type: "xbox", col: "blue" },
  ]);
  const colMap = {
    red: "bg-red-500",
    blue: "bg-blue-600",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-600",
    pink: "bg-pink-400",
    cyan: "bg-cyan-400",
    lime: "bg-lime-500",
  };

  const incrementCol = (gamepadId: number) => {
    const gamepadColorsInUse = connectedGamePads.map((c) => c.col);
    const usedIndicies = gamepadColorsInUse.map((col) =>
      Object.keys(colMap).findIndex((colMapKey) => colMapKey === col)
    );
    console.log(usedIndicies);
    const colorKeys = Object.keys(colMap);
    if (colorKeys.length === gamepadColorsInUse.length) {
      console.warn("no colours to choose from!");
      return;
    }
    const newState = JSON.parse(JSON.stringify(connectedGamePads));
    const gp = newState.find((cgp) => cgp.id === gamepadId);
    if (!gp) throw new Error("Could not find gamepad");
    const oldColIndex = Object.keys(colMap).findIndex(
      (colMapKey) => colMapKey === gp.col
    );
    let colIndex = oldColIndex;
    while (usedIndicies.includes(colIndex)) {
      colIndex = (colIndex + 1) % colorKeys.length;
    }
    console.log(colIndex);
    const newCol = colorKeys[colIndex];
    console.log("newColor is ", newCol);
    gp.col = newCol;
    setConnectedGamePads(newState);
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    document.addEventListener("keyup", detectKeyUp);

    return () => {
      document.removeEventListener("keydown", detectKeyDown);
      document.removeEventListener("keyup", detectKeyUp);
    };
  });

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    activeKeys.current.push(e.key);
    // console.log("clicked key: ", e.key);
  };

  const detectKeyUp = (e: KeyboardEvent) => {
    // console.log("released key: ", e.key);
    activeKeys.current.splice(
      activeKeys.current.findIndex((ak) => ak === e.key),
      1
    );
    // console.log(activeKeys.current);
  };
  return (
    <div className="flex items-center flex-col">
      <h1 className="bg-gradient-to-r from-red-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        Music Jam
      </h1>
      <div className="flex flex-row gap-2 mt-2">
        {connectedGamePads.map((cgp, i) => (
          <GamePad
            key={cgp.id}
            type={cgp.type}
            colClass={colMap[cgp.col]}
            incrementCol={() => incrementCol(cgp.id)}
          />
        ))}
      </div>
      {/* <button
        onClick={async () => {
          await Tone.start();
          setToneStarted(true);
          console.log("audio is ready");
        }}
      >
        Start
      </button> */}
      {toneStarted && <span>🎶🎵🎵</span>}
      {toneStarted && (
        <button
          onClick={() => {
            hello();
          }}
        >
          Play Note
        </button>
      )}
      <KeySelector musicKey={musicKey} setMusicKey={setMusicKey}></KeySelector>
      <div className="flex flex-row  flex-wrap  m-auto ">
        {getValidNotesInKey(musicKey, "natural").map((n, i) => {
          return (
            <MusicButton
              key={n + "(i:" + i + ")"}
              note={n.toUpperCase()}
              active={activeKeys.current.includes(i)}
              index={i}
            ></MusicButton>
          );
        })}
      </div>
      <footer>tone started {toneStarted}</footer>
    </div>
  );
}

export default App;

//TODOS
//TODO display connected controllers
//TODO conditionally map to the agnostic controller based on the type of the connected controller
//TODO add option to disable controller
//TODO move event listeners into app as useEffect
//TODO run some sort of event loop for controller inputs (100ms set interval is not acceptable)
//TODO ensure there isn't duplicate inputs on the controller when a button is being held. (holding button should feel like holding piano key)

//OPTIONAL TODOS
//TODO add music note animation when key pressed
//TODO flash button when key pressed
//TODO expand the octave a bit?

//TODO show the controller button pressed

//TODO have other instruments
