import { useState } from "react";
import { GamePad } from "./components/GamePad";
import { KeySelector } from "./components/KeySelector";
import { MusicKeyDisplay } from "./components/MusicKeyDisplay";
import { useGamepad } from "./hooks/useGamepad";
import { useKeyInputs } from "./hooks/useKeyInput";
import { hello } from "./utils/audio";

function App() {
  const [toneStarted, _] = useState(false);
  const [musicKey, setMusicKey] = useState("C");
  const activeKeys = useKeyInputs();
  const { connectedGamePads, setConnectedGamePads, incrementCol, colMap } =
    useGamepad();

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
      <MusicKeyDisplay musicKey={musicKey} activeKeys={activeKeys} />
      <footer className=" max-md:text-red-700 text-yellow-400 w-auto">
        tone started {toneStarted}
      </footer>
    </div>
  );
}

export default App;

//TODOS
//TODO display connected controllers
//TODO conditionally map to the agnostic controller based on the type of the connected controller
//TODO add option to disable controller
//TODO run some sort of event loop for controller inputs (100ms set interval is not acceptable)
//TODO ensure there isn't duplicate inputs on the controller when a button is being held. (holding button should feel like holding piano key)

//OPTIONAL TODOS
//TODO add music note animation when key pressed
//TODO expand the octave a bit?

//TODO show the controller button pressed

//TODO have other instruments
