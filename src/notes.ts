import * as Tone from "tone";
export const hello = () => {
  //create a synth and connect it to the main output (your speakers)
  //   const synth = new Tone.Synth().toDestination();

  //play a middle 'C' for the duration of an 8th note
  //synth.triggerAttackRelease("C4", "8n");

  console.log("clicked play note");
  const musicalKey = "F#m";
  const notes = getValidNotesInKey(musicalKey);
  console.log("Valid notes in key " + musicalKey + ": " + notes);

  piano.triggerAttackRelease(
    [
      notes[1].toUpperCase() + "4",
      notes[3].toUpperCase() + "4",
      notes[5].toUpperCase() + "4",
    ],
    4
  );
};

export const playNote = (note: string) => {
  note = note.toUpperCase();
  if (!/0-9/.test(note)) {
    note = note + "4";
  }
  piano.triggerAttackRelease(note, 4);
};

export const getValidNotesInKey = (key: string) => {
  console.log("getting notes for key: " + key);
  key = key.toLowerCase();
  const isMinor = key.includes("m");
  const baseNote = key.replace("m", "");
  const notes = [baseNote];
  let intervals = [2, 2, 1, 2, 2, 2];
  if (isMinor) {
    intervals = [2, 1, 2, 2, 1, 2];
  }
  let currentNote = baseNote;
  for (const val of intervals) {
    const nextTone = addSemitone(currentNote, val);
    if (!nextTone) throw "Failed adding " + val + " to " + currentNote;
    notes.push(nextTone);
    currentNote = nextTone;
  }
  return notes;
};

const addSemitone = (initialNote: string, number: number = 1) => {
  console.log("converting note to number " + initialNote);
  const n = convertNoteToNumber(initialNote);
  const m = n + number;
  if (m > 12)
    console.warn(
      "adding semitone(s) resulted in a number too high, so wrapping round"
    );
  const safeM = m % 12;
  return convertNumberToNote(safeM);
};

const indicies = [
  "a",
  "a#",
  "b",
  "c",
  "c#",
  "d",
  "d#",
  "e",
  "f",
  "f#",
  "g",
  "g#",
];

const convertNoteToNumber = (note: string) => {
  note = note.toLowerCase();
  const i = indicies.findIndex((n) => n === note);
  console.log("converted ", note, "to", i);
  return i + 1;
};

const convertNumberToNote = (number: number) => {
  return indicies.at(number - 1);
};

const piano = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();
