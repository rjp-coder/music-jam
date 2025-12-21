import { getAllMusicalKeys } from "../utils/utils";

export const KeySelector = ({ musicKey, setMusicKey }) => {
  const alignmentTweak =
    musicKey.replace("m", "").length == 2 ? "-ml-1" : "ml-1";

  const alignmentTweakForWordMinor =
    musicKey.replace("m", "").length == 2 ? "ml-2" : "ml-4";

  return (
    <div className="text-center -ml-20 text-2xl mb-4">
      <span>Key</span>
      <div className="text-center absolute -mt-10 ml-15 pt-2.5    ">
        <span
          className={`text-center  dark:text-white text-gray-800 pt-2.5  ${alignmentTweak} `}
        >
          {musicKey.replace("m", "").toUpperCase()}
        </span>
        <span className={`text-center p-2 ${alignmentTweakForWordMinor}`}>
          {musicKey.includes("m") ? "minor" : ""}
        </span>
      </div>
      <select
        value={musicKey}
        name="Key"
        onChange={(e) => {
          //prevent a situation where playing a note via keyboard changes the key!
          e.target.blur();
          setMusicKey(e.target?.value);
        }}
        className="select-none bg-transparent absolute text-center rounded-full z-2 w-12 h-12 ml-2.5 -mt-1 border-2 dark:border-white border-gray-800 capitalize text-transparent "
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
