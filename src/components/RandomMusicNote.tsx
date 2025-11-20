import { colMap } from "../hooks/useGamepadData";
import { chooseRandom } from "../utils/utils";
import { MusicNoteSvg } from "./MusicNoteSvg";

/* quite a few mysteries here

using the window width does not quite work at making random notes. 
The grouping of the notes is not random. i.e. if you hit many keys in 
succession you get notes in the same x,y position.

Also notes hit roughly at the same time share opacity
These are probably all signs that the animation is failing to treat them
as separate. Possibly because of where <Animation> context is. It seems to need to 
be above the map statement but then supposedly <Animation> should appear directly above each element
But if I do that then the initial state logic breaks completely and
The notes sort of animate in. Which looks terrible for what I need.  
*/

export const getRandomParams = (windowHeight, windowWidth) => {
  const left = 80;
  const top = 80;
  const rightPad = 120;
  const bottomPad = 120;

  const windowFactor = 1;

  const size = chooseRandom([80, 100, 120, 140, 160, 180, 200]);

  const x = Math.round(
    Math.random() * (windowWidth - left - rightPad) * windowFactor - left
  );
  const y = Math.round(
    Math.random() * (windowHeight - top - bottomPad) * windowFactor - top
  );

  return { size, x, y };
};

export const RandomMusicNote = ({ className, color, x, y, size }) => {
  const type = chooseRandom(["oneSemitone", "twoSemitones", "threeSemitones"]);

  // //@ts-ignore
  // const fill = chooseRandom([
  //   "#ff3355",
  //   "#e91e63",
  //   "#9c27b0",
  //   "#673ab7",
  //   "#03a9f4",
  //   "#00bcd4",
  //   "#009688",
  //   "#4caf50",
  //   "#cddc39",
  //   "#ffc107",
  //   "#ff9800",
  // ]);

  const gamepadColor = ("var(--color-" + colMap[color] + ")").replace(
    "bg-",
    ""
  );
  console.log("color in RandomMusicNote:", color, ",", gamepadColor);

  return (
    <MusicNoteSvg
      className={className}
      //@ts-ignore
      type={type}
      fill={gamepadColor}
      height={size + "px"}
      width={size + "px"}
      x={x}
      y={y}
    />
  );
};
