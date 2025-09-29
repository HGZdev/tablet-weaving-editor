// FixedLengthArray for creating arrays of a specific length
export type FixedLengthArray<T, L extends number> = L extends L
  ? number extends L
    ? T[] // If the length is unknown, allow any length
    : _FixedLengthArray<T, L, []>
  : never;

export type _FixedLengthArray<
  T,
  L extends number,
  R extends unknown[]
> = R["length"] extends L ? R : _FixedLengthArray<T, L, [T, ...R]>;

export type ThreadColor = string; // A color is represented as a string (hex color, for example)
export type Tablet<HolesNumber extends number = 4> = FixedLengthArray<
  ThreadColor,
  HolesNumber
>; // Array of colors of threads passed through each paper card (tablet)

export type Skew = -1 | 1; // directions in which thread were picked passed through card's hole
export type MakeDirChange = 1 | 0; // a card turning direction change at particular point (yes, no)

export type DirChangeTurn = -1 | 0 | 1; // a final rotation turn (back, forward, none) of the direction change at particular point

// Draft type, where the number of elements in `tablets` dictates the number of inner arrays in `dirsChanges`,
// the length of the `skews` array matches the number of `tablets`, and `paletteOfColors` always has 8 elements.
export type Draft<
  TabletsNumber extends number = number,
  HolesNumber extends number = number,
  PicksNumber extends number = number
> = {
  fileName: string;
  description?: string; // Optional description of the pattern
  tablets: FixedLengthArray<Tablet<HolesNumber>, TabletsNumber>; // Number of elements in `tablets`, each tablet has a length equal to `holes`
  holes: HolesNumber; // Number of holes in paper card. Number of holes determines the length of inner arrays in `tablets`
  picks: PicksNumber; // number of iterations made on a loom
  skews: FixedLengthArray<Skew, TabletsNumber>; // Skews must have the same length as `tablets`
  dirsChanges: FixedLengthArray<
    FixedLengthArray<MakeDirChange, PicksNumber>,
    TabletsNumber
  >; // Number of inner arrays in `dirsChanges` depends on the number of `tablets`, and their length depends on `picks`
  paletteOfColors: FixedLengthArray<ThreadColor, 8>;
};
