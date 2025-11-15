export const getAllNotes = () => {
  return "a a# b c c# d d# e f f# g g#".split(" ");
};

export const getAllMusicalKeys = () => {
  return "a am a# a#m b bm c cm c# c#m d dm d# d#m e e#m f fm f# f#m g gm g# g#m".split(
    " "
  );
};

export const chooseRandom = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};
