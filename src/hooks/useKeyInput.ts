import { useContext, useEffect, useState } from "react";
import { MusicalKeyContext } from "../AppContexts";
import { useFX } from "../Contexts/EffectsLayerContext";
import { playNote } from "../utils/audio";
import { getValidNotesInKey } from "../utils/notes";

export const theInstrumentForTheKeyboard = "piano";
export const theColorForTheKeyboard = "yellow";

export function useKeyInputs() {
  const [activeKeys, setActiveKeys] = useState([]);
  const [musicalKey] = useContext(MusicalKeyContext);
  const { spawnParticle } = useFX();

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    const ak = [...activeKeys];
    ak.push(e.key);
    console.log(ak);
    playNote(determineNote(musicalKey, e.key), theInstrumentForTheKeyboard);
    spawnParticle(theColorForTheKeyboard);
    setActiveKeys(ak);
  };

  const detectKeyUp = (e: KeyboardEvent) => {
    // console.log("released key: ", e.key);
    const ak = [...activeKeys];

    ak.splice(
      ak.findIndex((ak) => ak === e.key),
      1
    );
    console.log(ak);
    setActiveKeys(ak);

    // console.log(activeKeys);
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    document.addEventListener("keyup", detectKeyUp);

    return () => {
      document.removeEventListener("keydown", detectKeyDown);
      document.removeEventListener("keyup", detectKeyUp);
    };
  });

  return activeKeys;
}

export const keyIndexMap = {
  z: 0,
  x: 1,
  c: 2,
  v: 3,
  b: 4,
  n: 5,
  m: 6,
  ",": 7,
  ".": 8,
  a: 9,
  s: 10,
  d: 11,
  f: 12,
  g: 13,
  h: 14,
  j: 15,
  k: 16,
  l: 17,
  q: 18,
  w: 19,
  e: 20,
  r: 21,
  t: 22,
  y: 23,
  u: 24,
  i: 25,
  o: 26,
  "1": 27,
  "2": 28,
  "3": 29,
  "4": 30,
  "5": 31,
  "6": 32,
  "7": 33,
  "8": 34,
  "9": 35,
};

//I resent having to do this .... but it seems the simplest.
//Keys map to button indexes, but some buttons play the same key
//Therefore you can't just use the numbers to get the position
//In the scale, but you need to be aware of which keys share the same note.
//Easiest solution is to just map them all.
const keyScaleMap = {
  z: 0, //This is the note before the base note of the octave
  x: 1, //This is the root note
  c: 2,
  v: 3,
  b: 4,
  n: 5,
  m: 6,
  ",": 7, //This is the last note (7th) in the octave
  ".": 8, //This is the beginning of the next octave, accessible from the end of the previous octave's row on the keyboard
  a: 7, //This is the next row up on the keyboard, and the note before the base note of the octave
  s: 8, //This is the root note of the next octave on its row
  d: 9,
  f: 10,
  g: 11,
  h: 12,
  j: 13,
  k: 14, //this is the 7th note in the octave E.g. in the key of C, this it the B at the end
  l: 15, //this is the start of the next octave, accessible on the same row on the keyboard
  q: 14, //this is the next row on the keyboard which starts a note below the octave
  w: 15, //this is the start of the next octave, but on its row
  e: 16,
  r: 17,
  t: 18,
  y: 19,
  u: 20,
  i: 21, //This is the 7th note
  o: 22, //Start of next octave, accessible on this row
  "1": 21, //Next keyboard row
  "2": 22, //Next octave, on the next keyboard row
  "3": 23,
  "4": 24,
  "5": 25,
  "6": 26,
  "7": 27,
  "8": 28,
  "9": 29,
};

function determineNote(mk, keypressed) {
  const notes = getValidNotesInKey(mk, "natural", -1, 30, 3);
  const i = keyScaleMap[keypressed];
  return notes[i];
}
