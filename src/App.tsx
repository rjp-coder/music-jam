import { useState } from "react";
import { ConnectedGamepadsContext, MusicalKeyContext } from "./AppContexts.ts";
import { BrowserCheck } from "./components/BrowserCheck.tsx";
import { Gamepads } from "./components/GamePads.tsx";
import { LoadingProgress } from "./components/InstrumentsLoading.tsx";
import { KeySelector } from "./components/KeySelector.tsx";
import { MusicKeyboardDisplay } from "./components/MusicKeyDisplay.tsx";
import { Version } from "./components/Version.tsx";
import { useAudioUnlock } from "./hooks/useAudioContext.ts";
import { useGamepadData } from "./hooks/useGamepadData.ts";
import Tone from "./utils/audio.ts";
import { NetworkStatus } from "./components/NetworkStatus.tsx";
import { InstallButton } from "./components/InstallButton.tsx";

function App() {
  const [toneStarted] = useState(false);
  const [musicKey, setMusicKey] = useState("C");
  const gamepadContextVal = useGamepadData();
  const { isAudioUnlocked } = useAudioUnlock();
  const thisIsABrowser = globalThis.window;

  return (
    <div className="flex items-center flex-col ">
      {!isAudioUnlocked && thisIsABrowser && (
        <div className="absolute -mt-4">
          <button
            onClick={() => Tone.getContext().resume()}
            className="cursor-pointer"
          >
            Click here to enable audio
          </button>
        </div>
      )}

      <MusicalKeyContext value={[musicKey, setMusicKey]}>
        <ConnectedGamepadsContext value={gamepadContextVal}>
          <header>
            <h1 className="text-6xl bg-linear-to-r from-red-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-4">
              Music Jam
            </h1>
          </header>
          <main className="flex items-center flex-col">
            <BrowserCheck />
            <LoadingProgress />
            <Gamepads />
            {toneStarted && <span>🎶🎵🎵</span>}

            <KeySelector
              musicKey={musicKey}
              setMusicKey={setMusicKey}
            ></KeySelector>
            <MusicKeyboardDisplay musicKey={musicKey} />
          </main>
        </ConnectedGamepadsContext>
      </MusicalKeyContext>
      <footer className=" w-auto text-sm mt-4 ">
        <NetworkStatus />
        <Version />
        <InstallButton className="cursor-pointer text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-900 rounded-md border-gray-800 border-2 pl-1 pr-1 mt-1 text-lg dark:border-white" />
      </footer>
    </div>
  );
}

export default App;

//TODOS
//FIXME Mobile viewport notes stay at top left of window, but should follow viewport.
//FIXME dragging the finger across on a mobile device should ideally hit all the keys
//TODO Make the Browser banner dismissable

//OPTIONAL TODOS
//TODO add option to disable controller
//TODO PWA -- make the whole thing saved and workable offline
//TODO detect "half of a switch controller"
//TODO add configurable permissions to lock controller functionality and disable some
//TODO make sustain work on the notes
//TODO add per-note per-instrument volume dampening/amplification in audio.ts (samples shifted an octave can be too quiet)
//TODO Make the mouse and keyboard instrument and colour both configurable
//TODO rainbow outline on keys, particle effect on keypress
//TODO allow gamepad to be able to change its own instrument and colour using the right stick.
