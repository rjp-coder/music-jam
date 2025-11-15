import { keyIndexMap } from "../hooks/useKeyInput";
import { getValidNotesInKeySingleOctave } from "../utils/notes";
import { MusicButton } from "./MusicButton";

/*
This works but is horribly complex. This is because the screen wants
to display notes in reverse octave order but still ascending. 
But the keyboard has its own indexes which sort of go from bottom left 
to top right. 
Additionally there is some css 3d effects on the component which have 
a lot of negative margins for compensation. 

A better solution would be to have a sort of MusicKeyRow component
which gets passed its notes and the key bindings that would trigger those notes
and each row could easily then get its own css. 

*/

export const MusicKeyDisplay = ({ musicKey, activeKeys }) => {
  //make something that looks roughly like a keyboard
  //but where each row contains an octave

  //make a reference table for the octaves, for convenience
  const musicNotes = {
    K6: getValidNotesInKeySingleOctave(musicKey, "natural", 6),
    K5: getValidNotesInKeySingleOctave(musicKey, "natural", 5),
    K4: getValidNotesInKeySingleOctave(musicKey, "natural", 4),
    K3: getValidNotesInKeySingleOctave(musicKey, "natural", 3),
    K2: getValidNotesInKeySingleOctave(musicKey, "natural", 2),
  };

  //get 9 notes per octave (so that they can be mapped to keyboard keys). It's fine that
  //the notes overlap.
  //This is so that you can climb up a musical scale naturally on one row
  //without necessarily needing to change row.
  const octavesWithExtraNotesEachSide = [
    //the top row will contain the last note of octave 5 and then the full octave for octave
    //6 inclusive of the tonic of the 7th octave. In the key of C this would be B5 C6 D6.... C7
    [musicNotes.K5.at(-2), ...musicNotes.K6.slice(0, 8)],
    //Then do the same for last note of octave 4 and all of octave 5
    [musicNotes.K4.at(-2), ...musicNotes.K5.slice(0, 8)],
    //etc.
    [musicNotes.K3.at(-2), ...musicNotes.K4.slice(0, 8)],
    [musicNotes.K2.at(-2), ...musicNotes.K3.slice(0, 8)],
  ];

  //make an flat array of music notes
  const musicNotesFlat = octavesWithExtraNotesEachSide.flat();
  //get the indexes for those notes
  const noteIndexes = Object.keys(musicNotesFlat);

  //The music notes are at this point sorted by octaves in reverse
  //This is to make it display the highest octave at the top, and the lowest
  //at the bottom.

  //But the keyboard mappings start at z=>0 x=>1 ... a=>9 etc. So create
  //This map which gets from the letter indexes to the display indexes e.g. z on
  //The keyboard is 0, 0 in this map gives you 27. 27 is the 27th element on
  //The screen which is at the bottom left of the keyboard.
  const indiciesWithOctavesReversed = [
    noteIndexes.slice(27, 36),
    noteIndexes.slice(18, 27),
    noteIndexes.slice(9, 18),
    noteIndexes.slice(0, 9),
  ].flat();

  //get indexes for active keys
  const activeKeysAsIndicies = activeKeys.map((ak) => keyIndexMap[ak]);
  //convert the indexes to indexes that match the reversed octaves.
  const activeKeysTransformed = activeKeysAsIndicies.map(
    (ak) => +indiciesWithOctavesReversed[ak]
  );

  return (
    <div className="flex flex-row flex-wrap md:flex-none md:flex-nowrap md:grid md:grid-rows-4 md:grid-cols-9 -mt-18 mb-auto">
      {musicNotesFlat.map((note, i) => (
        <MusicButton
          key={note.toUpperCase() + ":" + i}
          note={note.toUpperCase()}
          active={activeKeysTransformed.includes(+i)}
          //rotate the top and bottom rows for a 3d effect
          transformRow={
            i < 9 ? "top" : i < 18 ? "high" : i < 27 ? "low" : "bottom"
          }
        />
      ))}
    </div>
  );
};
