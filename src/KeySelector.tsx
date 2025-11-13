import { getAllMusicalKeys, getAllNotes } from "./utils";

export const KeySelector = ({ musicKey, setMusicKey }) => {
  return (
    <>
      <h3>Key {musicKey}</h3>
      <label htmlFor="Key">Select a Key</label>
      <select
        value={musicKey}
        name="Key"
        onChange={(e) => setMusicKey(e.target?.value)}
        className="text-center"
      >
        {getAllMusicalKeys().map((note) => (
          <option value={note} key={note}>
            {note.replace("m", " minor")}
          </option>
        ))}
      </select>
    </>
  );
};
