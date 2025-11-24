import { useContext } from "react";
import { ConnectedGamepadsContext } from "../AppContexts";
import type { GamepadInput } from "../hooks/useGamepadButtons";
import { getValidNotesInKeySingleOctave } from "../utils/notes";
import { MusicButton } from "./MusicButton";

type MusicalOctaveDisplayProps = {
  className;
  octave;
  musicKey;
  minorType;
  leftPad;
  rightPad;
  keyboardMappings;
  controllerMappings;
  activeKeys;
  activeControllerKeys: GamepadInput[];
};

export const MusicalOctaveDisplay = ({
  className,
  octave,
  musicKey,
  minorType,
  leftPad,
  rightPad,
  keyboardMappings,
  controllerMappings,
  activeKeys,
  activeControllerKeys,
}: MusicalOctaveDisplayProps) => {
  const { connectedGamePads } = useContext(ConnectedGamepadsContext);

  if (!minorType) minorType = "natural";
  if (octave < 2 || octave > 6) throw "Octave " + octave + " is too extreme";
  if (leftPad > 7 || rightPad > 7) throw "padding too extreme";
  const musicNotes = {
    7: getValidNotesInKeySingleOctave(musicKey, minorType, 7, false),
    6: getValidNotesInKeySingleOctave(musicKey, minorType, 6, false),
    5: getValidNotesInKeySingleOctave(musicKey, minorType, 5, false),
    4: getValidNotesInKeySingleOctave(musicKey, minorType, 4, false),
    3: getValidNotesInKeySingleOctave(musicKey, minorType, 3, false),
    2: getValidNotesInKeySingleOctave(musicKey, minorType, 2, false),
    1: getValidNotesInKeySingleOctave(musicKey, minorType, 1, false),
  };

  const prevOctave = musicNotes[octave - 1];
  const thisOctave = musicNotes[octave];
  const nextOctave = musicNotes[octave + 1];

  const expandedOctave = [
    ...prevOctave.slice(-leftPad),
    ...thisOctave,
    ...nextOctave.slice(0, rightPad),
  ];

  // console.log({ expandedOctave });
  return (
    <div className="flex flex-row flex-wrap sm:flex-none sm:flex-nowrap max-sm:inline-block">
      {expandedOctave.map((note, i) => {
        const keyboardActivation = keyboardMappings[i];
        const controllerActivation = controllerMappings[i];
        const isActive =
          activeKeys.includes(keyboardActivation) ||
          activeControllerKeys
            .map((ack) => ack.btn)
            .includes(controllerActivation);

        //there might be more than one controller hitting the button but for now
        //just have an array with only the first controller.

        const controllersPressingButton = activeControllerKeys.filter(
          (ack) => controllerActivation == ack.btn
        );

        const controllerIndicies = controllersPressingButton.map(
          (cpb) => cpb.gamepadIndex
        );

        const gpArr = connectedGamePads.filter((gp) =>
          controllerIndicies.includes(gp.index)
        );

        const ac = gpArr.map((gp) => gp.col) || ["yellow"];

        const instruments = gpArr.map((gp) => gp.instrument) || ["piano"];

        if (ac.length > 1) {
          console.log({
            controllersPressingButton,
            controllerIndicies,
            gpArr,
            ac,
          });
        }

        return (
          <MusicButton
            className={className}
            key={`o${octave}-${note.toUpperCase()}(${i})`}
            note={note.toUpperCase()}
            active={isActive}
            activationColor={ac}
            instruments={instruments}
          />
        );
      })}
    </div>
  );
};
