import type Tone from "../utils/audio.client.ts";

let toneJs;
// let audio;
let instruments, checkInstrumentsLoaded, playNote;

type InstrumentName =
  | "piano"
  | "saxophone"
  | "xylophone"
  | "harp"
  | "guitar"
  | "flute";

type Instruments = {
  [index in InstrumentName]: Tone.Sampler;
};

if (import.meta.env.SSR) {
  // Imports server-stub
  toneJs = (await import("../utils/audio.server.ts")).default;
  // audio = await import("../utils/audio.server.ts");
  instruments = (await import("../utils/audio.server.ts")).instruments;
  checkInstrumentsLoaded = (await import("../utils/audio.server.ts"))
    .checkInstrumentsLoaded;
  playNote = (await import("../utils/audio.server.ts")).playNote;
} else {
  // Imports actual client version
  toneJs = (await import("../utils/audio.client.ts")).default;
  // audio = await import("../utils/audio.client.ts");
  instruments = (await import("../utils/audio.client.ts")).instruments;
  checkInstrumentsLoaded = (await import("../utils/audio.client.ts"))
    .checkInstrumentsLoaded;
  playNote = (await import("../utils/audio.client.ts")).playNote;
}

export { instruments, checkInstrumentsLoaded, playNote };

export type { InstrumentName, Instruments };

export default toneJs;
