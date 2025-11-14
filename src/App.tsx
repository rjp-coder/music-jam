import { useEffect, useRef, useState } from "react";
import { KeySelector } from "./KeySelector";
import { MusicButton } from "./MusicButton";
import { getValidNotesInKey, hello } from "./notes";

function App() {
  const [toneStarted, _] = useState(false);
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
