import { useGamepadInputs } from "../hooks/useGamepadButtons";
import { MusicalOctaveDisplay } from "./MusicalOctaveDisplay";

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

  const topClass = `" md:rotate-x-60 md:mt-20 md:mb-1 md:opacity-10 hover:opacity-100 active:opacity-100"`;
  const standardClass = ` p-1 border-white border-2 rounded-2xl min-w-16 max-w-16 max-h-10 cursor-pointer hover:bg-yellow-300 hover:text-black  active:bg-yellow-500`;
  const bottomClass = `md:-rotate-x-60 md:mb-1 md:opacity-10 hover:opacity-100 active:opacity-100`;

  return (
    <div className="-mt-20">
      {/* "flex flex-row flex-wrap md:flex-none md:flex-nowrap md:grid md:grid-rows-4 md:grid-cols-9 md:-mt-18 mb-auto" */}
      <MusicalOctaveDisplay
        className={standardClass + " " + topClass}
        octave={5}
        {...commonProps}
        keyboardMappings={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        controllerMappings={[null, 22, 23, 24, 25, 26, 27, 28, null]}
      />
      <MusicalOctaveDisplay
        className={standardClass}
        octave={4}
        {...commonProps}
        keyboardMappings={["q", "w", "e", "r", "t", "y", "u", "i", "o"]}
        controllerMappings={[null, 15, 16, 17, 18, 19, 20, 21, null]}
      />
      <MusicalOctaveDisplay
        className={standardClass}
        octave={3}
        {...commonProps}
        keyboardMappings={["a", "s", "d", "f", "g", "h", "j", "k", "l"]}
        controllerMappings={[null, 8, 9, 10, 11, 12, 13, 14, null]}
      />
      <MusicalOctaveDisplay
        className={standardClass + " " + bottomClass}
        octave={2}
        {...commonProps}
        keyboardMappings={["z", "x", "c", "v", "b", "n", "m", ",", "."]}
        controllerMappings={[null, 1, 2, 3, 4, 5, 6, 7, null]}
      />
    </div>
  );
};
