import type {
  MakeDirChange,
  DirChangeTurn,
  Tablet,
} from "../../domains/editor/components/types";

export const dc1: MakeDirChange[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
];

export const matrix1: DirChangeTurn[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, -1, -1, -1, -1, -1, -1, 0, 1],
  [1, 1, 1, 0, -1, -1, 0, 1, 1, 1],
  [1, 0, -1, -1, -1, 0, 1, 1, 1, 1],
];

export const tablets: Tablet[] = [
  ["lightblue", "violet", "orange", "yellow"], // A
  ["lightblue", "violet", "orange", "yellow"], // B
  ["lightblue", "violet", "orange", "yellow"], // C
  ["lightblue", "violet", "orange", "yellow"], // D
];
