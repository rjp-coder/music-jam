import useWindowDimensions from "../hooks/useWindowDimensions";
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

export const RandomMusicNote = ({ className }) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const type = chooseRandom(["oneSemitone", "twoSemitones", "threeSemitones"]);

  const fill = chooseRandom([
    "#ff3355",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#cddc39",
    "#ffc107",
    "#ff9800",
  ]);

  const size = chooseRandom([80, 100, 120, 140, 160, 180, 200]) + "px";

  const x = Math.round(Math.random() * windowWidth * 0.9 - 500);
  const y = Math.round(Math.random() * windowHeight * 0.9 - 60);

  return (
    <MusicNoteSvg
      className={className}
      type={type}
      fill={fill}
      height={size}
      width={size}
      x={x}
      y={y}
    />
  );
};
