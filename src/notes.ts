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
  if (!/[0-9]/.test(note)) {
    note = note + "4";
  }
  piano.triggerAttackRelease(note, 4);
};

export const getValidNotesInKey = (
  key: string,
  minorType: "natural" | "harmonic" | "melodic" = "natural"
) => {
  console.log("getting notes for key: " + key);
  key = key.toLowerCase();
  const isMinor = key.includes("m");
  const register = 4;
  const baseNote = key.replace("m", "") + register;
  const notes = [baseNote];
  let intervals = [2, 2, 1, 2, 2, 2, 1];
  if (isMinor) {
    if (minorType == "natural") {
      intervals = [2, 1, 2, 2, 1, 2, 2];
    } else if (minorType == "harmonic") {
      intervals = [2, 1, 2, 2, 1, 3, 1];
    } else if (minorType == "melodic") {
      intervals = [2, 1, 2, 2, 2, 2, 1];
    }
  }
  let currentNote = baseNote;
  for (const val of intervals) {
    let reg = currentNote.match(/[0-9]+/)?.[0];
    if (!reg) {
      console.warn(
        "expected to be able to extract the register (octave) from the given note. Note was ",
        currentNote,
        " ... will default to register of ",
        register
      );
      reg = "4";
    }
    const regNum = parseInt(reg);
    if (isNaN(regNum)) throw new Error("reg is NaN");
    const nextNote = addSemitone(currentNote, val);
    if (!nextNote) throw new Error("No note found from adding semitones");

    notes.push(nextNote);
    currentNote = nextNote;
  }
  return notes;
};

const addSemitone = (initialNote: string, number: number = 1) => {
  //   console.log("converting note to number " + initialNote);
  const noteNoRegister = initialNote.replaceAll(/[0-9]+/g, "");
  let noteRegister = initialNote.match(/[0-9]+/g)?.[0] || "4";
  const n = convertNoteToNumber(noteNoRegister);
  const m = n + number;
  let note = convertNumberToNote(m % 12);
  //if the initial note is before c and the note after is after c
  //it is crossing the c threshold and the register should increment.
  const crossingOverCThreshold = (n <= 3 && m >= 4) || (n > 4 && m >= 16); //"a,"a#","b"
  if (crossingOverCThreshold) {
    noteRegister = +noteRegister + 1 + "";
  } else if (m < 1) {
    noteRegister = +noteRegister - 1 + "";
  }

  return note + "" + noteRegister;
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
  //   console.log("converted ", note, "to", i);
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
