import { useState } from "react";
import { ConnectedGamepadsContext, MusicalKeyContext } from "./AppContexts";
import { Gamepads } from "./components/GamePads";
import { KeySelector } from "./components/KeySelector";
import { MusicKeyboardDisplay } from "./components/MusicKeyDisplay";
import { useGamepadData } from "./hooks/useGamepadData";
import { useKeyInputs } from "./hooks/useKeyInput";
import { hello } from "./utils/audio";

function App() {
  const [toneStarted, _] = useState(false);
  const activeKeys = useKeyInputs();
  const [musicKey, setMusicKey] = useState("C");
  const gamepadContextVal = useGamepadData();

  return (
    <div className="flex items-center flex-col">
      <MusicalKeyContext value={[musicKey, setMusicKey]}>
        <ConnectedGamepadsContext value={gamepadContextVal}>
          <h1 className="bg-linear-to-r from-red-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Music Jam
          </h1>
          <Gamepads musicKey={musicKey} />
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

          <KeySelector
            musicKey={musicKey}
            setMusicKey={setMusicKey}
          ></KeySelector>
          <MusicKeyboardDisplay musicKey={musicKey} activeKeys={activeKeys} />
        </ConnectedGamepadsContext>
      </MusicalKeyContext>
      <footer className=" max-md:text-red-700 text-yellow-400 w-auto">
        tone started {toneStarted}
      </footer>
    </div>
  );
}

export default App;

//TODOS
//TODO conditionally map to the agnostic controller based on the type of the connected controller
//TODO add option to disable controller
//TODO run some sort of event loop for controller inputs (100ms set interval is not acceptable)

//OPTIONAL TODOS
//TODO show the controller button pressed
