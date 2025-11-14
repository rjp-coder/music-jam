import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { getValidNotesInKey, hello, playNote } from "./notes";
import { MusicButton } from "./MusicButton";
import { KeySelector } from "./KeySelector";

function App() {
  const [toneStarted, setToneStarted] = useState(false);
  const activeKeys = useRef([]);
  const [musicKey, setMusicKey] = useState("C");
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
    console.log("clicked key: ", e.key);
  };

  const detectKeyUp = (e: KeyboardEvent) => {
    console.log("released key: ", e.key);
    activeKeys.current.splice(
      activeKeys.current.findIndex((ak) => ak === e.key),
      1
    );
    console.log(activeKeys.current);
  };
  return (
    <div className="flex items-center flex-col text-red-600">
      <h1>Music Jam</h1>
      <button
        onClick={async () => {
          await Tone.start();
          setToneStarted(true);
          console.log("audio is ready");
        }}
      >
        Start
      </button>
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
      <div className="flex flex-row overflow-scroll flex-wrap w-160 m-auto ">
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
    </div>
  );
}

export default App;
