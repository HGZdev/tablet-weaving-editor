type ThreadColor = string;

type Tablet = ThreadColor[]; // array of colors of threads passed through each paper card (tablet)
type Holes = number; // number of holes in paper card
type Skew = -1 | 1; // directions in which thread were picked passed through card's hole
type Picks = number; // number of iterations made on a loom
type MakeDirChange = 1 | 0; //a card turning direction change at particular point (yes, no)
type DirChangeTurn = -1 | 0 | 1; // a final rotation turn (back, forward, none) of the direction change at particular point

type Draft = {
  fileName?: string;
  tablets: Tablet[];
  holes: Holes;
  picks: Picks;
  skews: Skew[];
  paletteOfColors: ThreadColor[];
  dirsChanges: MakeDirChange[][];
};
