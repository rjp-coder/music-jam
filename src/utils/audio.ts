import * as Tone from "tone";
import { getValidNotesInKey } from "./notes";

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
