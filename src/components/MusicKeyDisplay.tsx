import {
  useGamepadInputs,
  type GamepadInput,
} from "../hooks/useGamepadButtons";
import { useKeyInputs } from "../hooks/useKeyInput";
import { agnosticKeysClimbingTheScale } from "../utils/controller";
import { MusicalOctaveDisplay } from "./MusicalOctaveDisplay";

export const MusicKeyboardDisplay = ({ musicKey }) => {
  const gamepadInputs = useGamepadInputs();
  const activeKeys = useKeyInputs();

  if (gamepadInputs.length) {
    // console.log({ gamepadInputs });
  }

  const commonProps = {
    musicKey: musicKey,
    minorType: "natural",
    leftPad: 1,
    rightPad: 1,
    activeKeys: activeKeys || [],
    activeControllerKeys:
      gamepadInputs.map((gi) => {
        return {
          btn: +gi.btn,
          gamepadIndex: gi.gamepadIndex,
        } as GamepadInput;
      }) || [],
  };

  const topClass = ` max-sm:rotate-y-60 max-sm:-ml-4 sm:rotate-x-60 sm:mt-2 sm:-mb-2 opacity-20 hover:opacity-100 active:opacity-100 focus:opacity-100 text-transparent dark:text-transparent`;
  const standardClass = ` p-1 dark:border-white border-gray-500 border-2 rounded-2xl min-w-16 max-w-16 max-h-10 cursor-pointer hover:bg-yellow-300 hover:text-black active:text-black focus:border-4 focus:border-blue-500 focus:text-black active:bg-yellow-500`;
  const bottomClass = `max-sm:-rotate-y-60 max-sm:-mr-4 sm:-rotate-x-60 sm:-mt-2 sm:mb-2 opacity-20 hover:opacity-100 active:opacity-100 focus:opacity-100 text-transparent dark:text-transparent`;

  return (
    <div className="max-sm:flex max-sm:flex-row-reverse max-sm:flex-nowrap max-sm:mt-6 ">
      <MusicalOctaveDisplay
        className={standardClass + " " + topClass}
        octave={6}
        {...commonProps}
        keyboardMappings={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        controllerMappings={[
          null,
          ...agnosticKeysClimbingTheScale.slice(14, 21),
          null,
        ]}
      />
      <MusicalOctaveDisplay
        className={standardClass}
        octave={5}
        {...commonProps}
        keyboardMappings={["q", "w", "e", "r", "t", "y", "u", "i", "o"]}
        controllerMappings={[
          null,
          ...agnosticKeysClimbingTheScale.slice(7, 14),
          null,
        ]}
      />
      <MusicalOctaveDisplay
        className={standardClass}
        octave={4}
        {...commonProps}
        keyboardMappings={["a", "s", "d", "f", "g", "h", "j", "k", "l"]}
        controllerMappings={[
          null,
          ...agnosticKeysClimbingTheScale.slice(0, 7),
          null,
        ]}
      />
      <MusicalOctaveDisplay
        className={standardClass + " " + bottomClass}
        octave={3}
        {...commonProps}
        keyboardMappings={["z", "x", "c", "v", "b", "n", "m", ",", "."]}
        controllerMappings={[
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ]}
      />
    </div>
  );
};
