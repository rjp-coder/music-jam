import * as Tone from "tone";
import type { Instruments } from "./audio";

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

export const instruments: Instruments = {
  piano,
  saxophone,
  xylophone,
  harp,
  guitar,
  flute,
};

const instrumentOptions = {
  piano: [4, 0, 0.4],
  saxophone: [0.4, 0, 0.4],
  xylophone: [2, 1, 4],
  harp: [2, 0.4, 1],
  guitar: [2, 0, 0.5],
  flute: [1, 0, 1],
};

export const checkInstrumentsLoaded = () => {
  const status = {};
  for (const key in instruments) {
    status[key] = instruments[key].loaded;
  }
  return status;
};

export const playNote = (note: string, instrumentName: keyof Instruments) => {
  note = note.toUpperCase();
  if (!/[0-9]/.test(note)) {
    note = note + "4";
  }
  const instrument = instruments[instrumentName];
  if (!instrument) console.error(instrumentName);
  const [duration, , volume] = instrumentOptions[instrumentName];

  try {
    instrument.triggerAttackRelease(note, duration, undefined, volume);
  } catch (e) {
    console.error(
      "Tried to play a note before the sound file for the note has loaded"
    );
    console.error(e);
  }
};
