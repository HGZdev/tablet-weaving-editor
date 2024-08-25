import {describe, expect, test} from "vitest";
import {genDirsMatrix, genSqrt, genThread} from "./helpers";

const dc1: MakeDirChange[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
];

const matrix1: DirChangeTurn[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, -1, -1, -1, -1, -1, -1, 0, 1],
  [1, 1, 1, 0, -1, -1, 0, 1, 1, 1],
  [1, 0, -1, -1, -1, 0, 1, 1, 1, 1],
];

const tablets: Tablet[] = [
  ["lightblue", "violet", "orange", "yellow"], // A
  ["lightblue", "violet", "orange", "yellow"], // B
  ["lightblue", "violet", "orange", "yellow"], // C
  ["lightblue", "violet", "orange", "yellow"], // D
];

describe("Editor helpers", () => {
  describe("genDirsMatrix", () => {
    test("generates the correct matrix", () => {
      expect(genDirsMatrix(dc1)).toEqual(matrix1);
    });

    test("with empty input", () => {
      expect(genDirsMatrix([])).toEqual([]);
    });

    test("with single element arrays", () => {
      const dirsChanges: MakeDirChange[][] = [[1], [0]];
      const expectedMatrix: DirChangeTurn[][] = [[0], [1]];
      expect(genDirsMatrix(dirsChanges)).toEqual(expectedMatrix);
    });
  });

  describe("genSqrt", () => {
    test("generates the correct square root values", () => {
      const tests: [
        {
          tablets: Tablet[];
          row: number;
          col: number;
          dirsChanges: MakeDirChange[][];
        },
        {
          bg: string;
          dir: number;
          isTurnPoint: boolean;
        }
      ][] = [
        [
          {col: 0, row: 0, dirsChanges: dc1, tablets},
          {bg: "lightblue", dir: 1, isTurnPoint: false},
        ],
        [
          {col: 0, row: 3, dirsChanges: dc1, tablets},
          {bg: "yellow", dir: 1, isTurnPoint: false},
        ],
        [
          {col: 0, row: 6, dirsChanges: dc1, tablets},
          {bg: "orange", dir: 1, isTurnPoint: false},
        ],
        [
          {col: 1, row: 9, dirsChanges: dc1, tablets},
          {bg: "yellow", dir: 1, isTurnPoint: false},
        ],
        [
          {col: 2, row: 3, dirsChanges: dc1, tablets},
          {bg: "orange", dir: -1, isTurnPoint: true},
        ],
        [
          {col: 2, row: 5, dirsChanges: dc1, tablets},
          {bg: "lightblue", dir: -1, isTurnPoint: false},
        ],
        [
          {col: 2, row: 6, dirsChanges: dc1, tablets},
          {bg: "lightblue", dir: 1, isTurnPoint: true},
        ],
        [
          {col: 3, row: 3, dirsChanges: dc1, tablets},
          {bg: "orange", dir: -1, isTurnPoint: false},
        ],
      ];

      for (const [input, output] of tests) {
        expect(genSqrt(input)).toEqual(output);
      }
    });

    test("on first row", () => {
      const result = genSqrt({
        tablets,
        row: 0,
        col: 0,
        dirsChanges: dc1,
      });
      expect(result).toEqual({bg: "lightblue", dir: 1, isTurnPoint: false});
    });

    test("on last row", () => {
      const result = genSqrt({
        tablets,
        row: 9,
        col: 0,
        dirsChanges: dc1,
      });
      expect(result).toEqual({bg: "violet", dir: 1, isTurnPoint: false});
    });
  });

  describe("genThread", () => {
    test("generates correct thread", () => {
      const thread = genThread({col: 0, picks: 4, dirsChanges: dc1, tablets});
      expect(thread.map(({bg}) => bg)).toEqual([
        "lightblue",
        "violet",
        "orange",
        "yellow",
      ]);
      expect(thread.map(({dir}) => dir)).toEqual([1, 1, 1, 1]);
    });

    test("correctly integrates genThread & genDraft", () => {
      const thread = genThread({col: 2, picks: 10, dirsChanges: dc1, tablets});

      expect(thread.map(({bg}) => bg)).toEqual([
        "lightblue",
        "violet",
        "orange",
        "orange",
        "violet",
        "lightblue",
        "lightblue",
        "violet",
        "orange",
        "yellow",
      ]);

      expect(thread.map(({dir}) => dir)).toEqual([
        1, 1, 1, -1, -1, -1, 1, 1, 1, 1,
      ]);
    });
  });
});
