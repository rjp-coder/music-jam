import { getAllMusicalKeys } from "../utils/utils";

export const KeySelector = ({ musicKey, setMusicKey }) => {
  return (
    <div className="mt-8 text-center -ml-32 text-2xl">
      <span>Key</span>
      <div className="text-center   absolute -mt-10 ml-15 pt-2.5    ">
        <span
          className={`text-center  text-white  pt-2.5  ${
            musicKey.replace("m", "").length == 1 ? "ml-1" : ""
          } `}
        >
          {musicKey.replace("m", "").toUpperCase()}
        </span>
        <span className="text-center  ml-6 p-2   ">
          {musicKey.includes("m") ? "minor" : ""}
        </span>
      </div>
      <select
        value={musicKey}
        name="Key"
        onChange={(e) => setMusicKey(e.target?.value)}
        className="bg-transparent absolute text-center rounded-full z-2 w-12 h-12 ml-2.5 -mt-1 border-2 border-white capitalize text-transparent "
      >
        {getAllMusicalKeys().map((note) => (
          <option className="bg-gray-900 text-white" value={note} key={note}>
            {note.replace("m", " minor")}
          </option>
        ))}
      </select>

      {/* <label htmlFor="Key">Select a Key</label> */}
    </div>
  );
};
