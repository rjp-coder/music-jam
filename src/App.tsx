import { useState } from "react";
import { ConnectedGamepadsContext, MusicalKeyContext } from "./AppContexts";
import { Gamepads } from "./components/GamePads";
import { KeySelector } from "./components/KeySelector";
import { MusicKeyboardDisplay } from "./components/MusicKeyDisplay";
import { Version } from "./components/Version";
import { useAudioUnlock } from "./hooks/useAudioContext";
import { useGamepadData } from "./hooks/useGamepadData";
import { hello } from "./utils/audio";
import Tone from "./utils/audio.ts";
import { BrowserCheck } from "./components/BrowserCheck.tsx";
import { useIsOnline } from "./hooks/useIsOnline.ts";

function App() {
  const [toneStarted] = useState(false);
  const [musicKey, setMusicKey] = useState("C");
  const gamepadContextVal = useGamepadData();
  const { isAudioUnlocked } = useAudioUnlock();
  const { isOnline, effectiveNetworkType } = useIsOnline();

  const isSlow = ["slow-2g", "2g", "3g"].includes(effectiveNetworkType);

  return (
    <div className="flex items-center flex-col">
      {!isAudioUnlocked && (
        <p
          onClick={() => Tone.getContext().resume()}
          className="cursor-pointer"
        >
          Click here to enable audio
        </p>
      )}
      <MusicalKeyContext value={[musicKey, setMusicKey]}>
        <ConnectedGamepadsContext value={gamepadContextVal}>
          <h1 className="text-6xl bg-linear-to-r from-red-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-4">
            Music Jam
          </h1>
          <BrowserCheck />
          {!isOnline && <p>(You are offline)</p>}
          {isOnline && isSlow && (
            <p>
              (Your connection is slow. Instrument sounds may take some time to
              load)
            </p>
          )}
          <Gamepads />
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
          <MusicKeyboardDisplay musicKey={musicKey} />
        </ConnectedGamepadsContext>
      </MusicalKeyContext>
      <footer className=" w-auto">
        <Version />
      </footer>
    </div>
  );
}

export default App;

//TODOS
//TODO add option to disable controller

//OPTIONAL TODOS
//TODO PWA -- make the whole thing saved and workable offline
//TODO detect "half of a switch controller"
//TODO show status ...assets loaded, stable wifi connection
//TODO add configurable permissions to lock controller functionality and disable some
//TODO make sustain work on the notes
//TODO add per-note per-instrument volume dampening/amplification in audio.ts (samples shifted an octave can be too quiet)
//TODO Make the mouse and keyboard instrument and colour both configurable
//TODO rainbow outline on keys, particle effect on keypress
//TODO allow gamepad to be able to change its own instrument and colour using the right stick.
