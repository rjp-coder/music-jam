//import * as Tone from "tone";

export default {
  getContext: () => {
    return { state: "running", resume: () => {} };
  },
};

export const instruments = {
  piano: "piano",
  saxophone: "saxophone",
  xylophone: "xylophone",
  harp: "harp",
  guitar: "guitar",
  flute: "flute",
};

export type Instruments = typeof instruments;

export type InstrumentName = keyof Instruments;

const instrumentOptions = {
  piano: [4, 0, 0.4],
  saxophone: [0.4, 0, 0.4],
  xylophone: [2, 1, 4],
  harp: [2, 0.4, 1],
  guitar: [2, 0, 0.5],
  flute: [1, 0, 1],
};

console.log(instrumentOptions);

export const checkInstrumentsLoaded = () => {
  return { piano: true, xylophone: false };
};

export const hello = () => {
  console.log("Hello function called");
};

export const playNote = (note: string, instrumentName: keyof Instruments) => {
  note = note.toUpperCase();
  console.log("playing note " + note + "with instrument " + instrumentName);
};
