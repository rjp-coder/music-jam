import { useState } from "react";
import { ConnectedGamepadsContext, MusicalKeyContext } from "./AppContexts";
import { BrowserCheck } from "./components/BrowserCheck.tsx";
import { Gamepads } from "./components/GamePads";
import { InstrumentsLoading } from "./components/InstrumentsLoading.tsx";
import { KeySelector } from "./components/KeySelector";
import { MusicKeyboardDisplay } from "./components/MusicKeyDisplay";
import { Version } from "./components/Version";
import { useAudioUnlock } from "./hooks/useAudioContext";
import { useGamepadData } from "./hooks/useGamepadData";
import { useIsOnline } from "./hooks/useIsOnline.ts";
import { hello } from "./utils/audio";
import Tone from "./utils/audio.ts";

function App() {
  const [toneStarted] = useState(false);
  const [musicKey, setMusicKey] = useState("C");
  const gamepadContextVal = useGamepadData();
  const { isAudioUnlocked } = useAudioUnlock();
  const { isOnline, effectiveNetworkType } = useIsOnline();

  const isSlow = ["slow-2g", "2g", "3g"].includes(effectiveNetworkType);

  const offlineInternetFooter = <span className="text-red-600">Offline</span>;
  const slowInternetFooter = (
    <span className="text-amber-400">{effectiveNetworkType}</span>
  );
  const fastInternetFooter = (
    <span className="text-green-600">{effectiveNetworkType || "Online"}</span>
  );
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
          <InstrumentsLoading />
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
      <footer className=" w-auto text-sm mt-4 ">
        {
          <p>
            Internet Connection{" "}
            {isOnline
              ? isSlow
                ? slowInternetFooter
                : fastInternetFooter
              : offlineInternetFooter}
          </p>
        }
        <Version />
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
