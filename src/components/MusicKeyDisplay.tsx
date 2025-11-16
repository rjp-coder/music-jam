import { useGamepadInputs } from "../hooks/useGamepadButtons";
import { keyIndexMap } from "../hooks/useKeyInput";
import { getValidNotesInKeySingleOctave } from "../utils/notes";
import { MusicalOctaveDisplay } from "./MusicalOctaveDisplay";
import { MusicButtonOld } from "./MusicButtonOld";

export const MusicKeyboardDisplay = ({ musicKey, activeKeys }) => {
  const gamepadInputs = useGamepadInputs();

  if (gamepadInputs.length) {
    console.log({ gamepadInputs });
  }

  const commonProps = {
    musicKey: musicKey,
    minorType: "melodic",
    leftPad: 1,
    rightPad: 1,
    activeKeys: activeKeys || [],
    //The plus 4 here is kind of a hack -- saves messing with the agnostic button mapping and helps centre the octave for nintendo switch at least . . .
    activeControllerKeys: gamepadInputs.map((gi) => +gi.btn + 4) || [],
  };

  return (
    <div className="">
      {/* "flex flex-row flex-wrap md:flex-none md:flex-nowrap md:grid md:grid-rows-4 md:grid-cols-9 md:-mt-18 mb-auto" */}
      <MusicalOctaveDisplay
        className={undefined}
        octave={5}
        {...commonProps}
        keyboardMappings={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        controllerMappings={[null, 22, 23, 24, 25, 26, 27, 28, null]}
      />
      <MusicalOctaveDisplay
        className={undefined}
        octave={4}
        {...commonProps}
        keyboardMappings={["q", "w", "e", "r", "t", "y", "u", "i", "o"]}
        controllerMappings={[null, 15, 16, 17, 18, 19, 20, 21, null]}
      />
      <MusicalOctaveDisplay
        className={undefined}
        octave={3}
        {...commonProps}
        keyboardMappings={["a", "s", "d", "f", "g", "h", "j", "k", "l"]}
        controllerMappings={[null, 8, 9, 10, 11, 12, 13, 14, null]}
      />
      <MusicalOctaveDisplay
        className={undefined}
        octave={2}
        {...commonProps}
        keyboardMappings={["z", "x", "c", "v", "b", "n", "m", ",", "."]}
        controllerMappings={[null, 1, 2, 3, 4, 5, 6, 7, null]}
      />
    </div>
  );
};
