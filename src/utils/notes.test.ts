import { describe, expect, test } from "vitest";
import {
  formatKey,
  getAllValidNotesInKey,
  getValidNotesInKey,
  getValidNotesInKeySingleOctave,
} from "./notes";

describe("format key", () => {
  test("it defaults to providing a key in register 4", () => {
    expect(formatKey("D#")).toEqual("D#4");
    expect(formatKey("A")).toEqual("A4");
    expect(formatKey("Am")).toEqual("Am4");
  });
  test("it correctly returns the register in string if provided, with the number coming last", () => {
    expect(formatKey("F4#")).toEqual("F#4");
    expect(formatKey("F#m4")).toEqual("F#m4");
  });
  test("it automatically capitalises notes", () => {
    expect(formatKey("e4")).toEqual("E4");
  });
  test("it adds the passed in register to the letter", () => {
    expect(formatKey("E", 5)).toEqual("E5");
    expect(formatKey("A#m", 5)).toEqual("A#m5");
  });
  test("it prioritises the passed in register over the one in the string", () => {
    expect(formatKey("E5", 3)).toEqual("E3");
    expect(formatKey("A#m4", 6)).toEqual("A#m6");
  });
});

describe("getAllValidNotesInKey", () => {
  test("it can get all notes in key of C major", () => {
    const notes = getAllValidNotesInKey("C");
    expect(notes).toContain("C4");
    expect(notes).toContain("D2");
    expect(notes).toContain("E7");
  });
  test("it can get all notes in key of B minor", () => {
    const notes = getAllValidNotesInKey("Bm");
    expect(notes).toContain("B4");
    expect(notes).toContain("C#2");
    expect(notes).toContain("D7");
  });
  test("it can get all notes when the key is lowercase", () => {
    const notes = getAllValidNotesInKey("am");
    expect(notes).toContain("A4");
    expect(notes).toContain("B4");
    expect(notes).toContain("C2");
    expect(notes).toContain("D7");
  });
});

describe("getValidNotesInKeySingleOctave", () => {
  test("it can get notes for C major", () => {
    const notes = getValidNotesInKeySingleOctave("C", "natural", 4);
    expect(notes).toEqual(["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"]);
  });
  test("it can get notes for A minor natural", () => {
    const notes = getValidNotesInKeySingleOctave("Am", "natural", 4);
    expect(notes).toEqual(["a4", "b4", "c5", "d5", "e5", "f5", "g5", "a5"]);
  });
});

describe("getValidNotesInKey", () => {
  test("it can get a subset of notes in key of G major", () => {
    const notes = getValidNotesInKey("G", null, 0, 5);
    expect(notes).toEqual(["G4", "A4", "B4", "C5", "D5"]);
  });
  test("it can return the appropriate number of notes", () => {
    const notes = getValidNotesInKey("G", undefined, 0, 12);
    expect(notes).toEqual(
      // prettier-ignore
      ["G4","A4","B4","C5","D5","E5","F#5","G5","A5","B5","C6","D6",]
    );
  });
  test("it can return notes in a key but offset by an amount", () => {
    const notes = getValidNotesInKey("C", undefined, 3, 5);
    expect(notes).toEqual(
      // prettier-ignore
      ["F4","G4","A4","B4","C5",]
    );
    const notes2 = getValidNotesInKey("C", undefined, -3, 5);
    expect(notes2).toEqual(
      // prettier-ignore
      ["G3","A3","B3","C4","D4",]
    );
  });
  test("it can handle minor keys and registers", () => {
    const notes = getValidNotesInKey("Gm", "natural", 0, 12, 3);
    expect(notes).toEqual(
      // prettier-ignore
      ["G3","A3","A#3","C4","D4","D#4","F4","G4","A4","A#4","C5","D5",]
    );
  });
});
