import type { Draft } from "../../domains/editor/components/types";

export const plainChevronPattern: Draft = {
  fileName: "Plain Chevron Pattern",
  description:
    "Simple chevron pattern with black and white contrast. Perfect for beginners learning tablet weaving techniques and creating clean geometric designs.",
  tablets: [
    ["#000000", "#FFFFFF", "#000000", "#000000"],
    ["#000000", "#000000", "#FFFFFF", "#000000"],
    ["#000000", "#000000", "#FFFFFF", "#000000"],
    ["#000000", "#FFFFFF", "#000000", "#000000"],
  ],
  picks: 8,
  holes: 4,
  skews: [1, 1, -1, -1],
  dirsChanges: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  paletteOfColors: [
    "#000000",
    "#C0C0C0",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#ffa500",
    "#FF0000",
    "#FFFFFF",
  ],
};
