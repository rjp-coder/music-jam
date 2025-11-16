export const getAllValidNotesInKey = (
  key: string,
  minorType: "natural" | "harmonic" | "melodic" = "natural"
) => {
  const allNotes = [];
  for (let reg = 1; reg <= 8; reg++) {
    const notes = getValidNotesInKeySingleOctave(key, minorType, reg);
    for (const n of notes) {
      const formattedNote = n.toLocaleUpperCase();
      if (!allNotes.includes(formattedNote)) {
        allNotes.push(formattedNote);
      }
    }
  }
  return allNotes;
};

export const getValidNotesInKey = (
  key: string,
  minorType: "natural" | "harmonic" | "melodic" = "natural",
  offset: number = 0,
  numNotes: number = 8,
  register?: number
) => {
  const allNotes = getAllValidNotesInKey(key, minorType);
  const fk = getBaseNoteFromKey(key, register);
  const basenoteIndex = allNotes.findIndex((note) => note === fk);
  const offsetIndex = basenoteIndex + offset;
  const validNotesInKey = allNotes.slice(offsetIndex, offsetIndex + numNotes);
  return validNotesInKey;
};

export const formatKey = (key: string, register?: number) => {
  const defaultReg = 4;
  const regInKey = key.match(/[0-9]+/)?.[0];
  const reg = register || regInKey;
  const reglessKey = key.replace(/[0-9]+/, "");
  const formattedKey = reglessKey + (reg || defaultReg);
  return formattedKey.toUpperCase().replace("M", "m");
};

export const getBaseNoteFromKey = (key: string, register: number) => {
  const fk = formatKey(key, register);
  return fk.replace(/[mM]+/, ""); //.toLowerCase();
};

export const getValidNotesInKeySingleOctave = (
  key: string,
  minorType: "natural" | "harmonic" | "melodic" = "natural",
  register: number = 4,
  includeFirstKeyOfNextOctave: boolean = true
) => {
  key = key.toLowerCase();
  const isMinor = key.includes("m");
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
  if (includeFirstKeyOfNextOctave) {
    return notes;
  } else {
    return notes.slice(0, -1);
  }
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
