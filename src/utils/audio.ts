import * as Tone from "tone";
import { getValidNotesInKey } from "./notes";

export default Tone;

const baseUrl = "https://rjp-coder.github.io/music-jam/noteSamples/";

const piano = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: 1,
  baseUrl: baseUrl,
}).toDestination();

const saxophone = new Tone.Sampler({
  urls: {
    E2: "SaxE2.mp4",
    E3: "SaxE4.mp4",
    E4: "SaxE3.mp4",
  },
  release: 1,
  baseUrl: baseUrl,
}).toDestination();

const xylophone = new Tone.Sampler({
  urls: {
    F4: "XylophoneF4.mp4",
  },
  release: 1,
  baseUrl: baseUrl,
}).toDestination();

const harp = new Tone.Sampler({
  urls: {
    F4: "HarpF4.mp4",
  },
  release: 1,
  baseUrl: baseUrl,
}).toDestination();

const guitar = new Tone.Sampler({
  urls: {
    C5: "GuitarC5.mp4",
  },
  release: 1,
  baseUrl: baseUrl,
}).toDestination();

const flute = new Tone.Sampler({
  urls: {
    C4: "FluteC4.mp4",
  },
  release: 1,
  baseUrl: baseUrl,
}).toDestination();

export const instruments = {
  piano,
  saxophone,
  xylophone,
  harp,
  guitar,
  flute,
};

export type Instruments = typeof instruments;
const instrumentOptions = {
  piano: [4, 0, 0.4],
  saxophone: [0.4, 0, 0.4],
  xylophone: [2, 1, 4],
  harp: [2, 0.4, 1],
  guitar: [2, 0, 0.5],
  flute: [1, 0, 1],
};

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
      notes[5].toUpperCase() + "4",
      notes[3].toUpperCase() + "4",
    ],
    4
  );
};

export const playNote = (note: string, instrumentName: keyof Instruments) => {
  note = note.toUpperCase();
  if (!/[0-9]/.test(note)) {
    note = note + "4";
  }
  const instrument = instruments[instrumentName];
  if (!instrument) console.error(instrumentName);
  const [duration, _clip, volume] = instrumentOptions[instrumentName];

  try {
    instrument.triggerAttackRelease(note, duration, undefined, volume);
  } catch (e) {
    console.error(
      "Tried to play a note before the sound file for the note has loaded"
    );
    console.error(e);
  }
};
