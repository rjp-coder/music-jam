import { getValidNotesInKeySingleOctave } from "../utils/notes";
import { MusicButton } from "./MusicButton";

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
}) => {
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

  const prevOctave = [musicNotes[octave - 1]];
  const thisOctave = [musicNotes[octave]];
  const nextOctave = [musicNotes[octave + 1]];

  const expandedOctave = [
    ...prevOctave.slice(-leftPad),
    ...thisOctave,
    ...nextOctave.slice(0, rightPad),
  ];
  return (
    <div className="flex flex-row flex-wrap md:flex-none md:flex-nowrap">
      {expandedOctave.map((note, i) => {
        const keyboardActivation = keyboardMappings[i];
        const controllerActivation = controllerMappings[i];
        const isActive =
          activeKeys.incudes(keyboardActivation) ||
          controllerActivation.includes(controllerActivation);

        return (
          <MusicButton
            key={`o${octave}-${note.toUpperCase()}(${i})`}
            note={note.toUpperCase()}
            active={isActive}
            activatedByController={controllerActivation.includes(
              controllerActivation
            )}
            //activeColor={activeColor}
          />
        );
      })}
    </div>
  );
};
