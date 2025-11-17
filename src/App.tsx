import { AnimatePresence } from "motion/react";
import { createContext, useEffect, useState } from "react";
import { Gamepads } from "./components/GamePads";
import { KeySelector } from "./components/KeySelector";
import { MusicKeyboardDisplay } from "./components/MusicKeyDisplay";
import { RandomMusicNote } from "./components/RandomMusicNote";
import { useKeyInputs } from "./hooks/useKeyInput";
import { hello } from "./utils/audio";
import { useGamepadData, type GamepadHookData } from "./hooks/useGamepadData";

export const MusicNoteAnimationsContext = createContext([]);
export const MusicalKeyContext = createContext([]);
export const ConnectedGamepadsContext: React.Context<GamepadHookData> =
  createContext({});

function App() {
  const [toneStarted, _] = useState(false);
  const activeKeys = useKeyInputs();
  const [musicNoteAnimations, setMusicNoteAnimations] = useState([]);
  const [musicKey, setMusicKey] = useState("C");
  const gamepadContextVal = useGamepadData();
  useEffect(() => {
    if (musicNoteAnimations.length >= 5) {
      setMusicNoteAnimations([]);
    }
  });

  return (
    <MusicNoteAnimationsContext
      value={[musicNoteAnimations, setMusicNoteAnimations]}
    >
      <div className="flex items-center flex-col">
        <MusicalKeyContext value={[musicKey, setMusicKey]}>
          <ConnectedGamepadsContext value={gamepadContextVal}>
            <h1 className="bg-gradient-to-r from-red-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              Music Jam
            </h1>
            <Gamepads musicKey={musicKey} />
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

            <AnimatePresence>
              {musicNoteAnimations.map((mna, i) => (
                <RandomMusicNote
                  key={i}
                  className="absolute overflow-visible"
                ></RandomMusicNote>
              ))}
            </AnimatePresence>

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
    </MusicNoteAnimationsContext>
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
