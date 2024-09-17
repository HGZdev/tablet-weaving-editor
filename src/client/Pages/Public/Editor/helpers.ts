// Regular expression for RGB Hex
export const regexRGBHex = /^(#)((?:[\dA-Fa-f]{3}){1,2})$/;

// Array of the hole names
export const holeNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Modulo function to prevent negative results
const modulo = (n: number, m: number) => {
  const remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
};

// Generate directions matrix
export const genDirsMatrix = (dirsChanges: MakeDirChange[][]) => {
  const matrix: DirChangeTurn[][] = [];

  for (const [i, colArr] of dirsChanges.entries()) {
    if (!colArr) continue;
    let currDir: DirChangeTurn = 1;

    for (const dirChange of colArr) {
      if (!matrix[i]) matrix.push([]);

      if (dirChange) {
        matrix[i].push(0);
        currDir = currDir > 0 ? -1 : 1;
      } else {
        matrix[i].push(currDir || 0);
      }
    }
    currDir = 1;
  }

  return matrix;
};

// Generate square root
export const genSqrt = ({
  tablets,
  row,
  col,
  dirsChanges,
}: {
  tablets: Draft["tablets"];
  row: number;
  col: number;
  dirsChanges: MakeDirChange[][];
}) => {
  const matrix = genDirsMatrix(dirsChanges);
  const tablet = tablets[col];

  // Picks current rotation direction: 1 or -1
  let dirSum = 0;
  for (let i = 0; i <= row; i++) {
    dirSum += dirsChanges[col][i];
  }
  const dir: -1 | 1 = dirSum % 2 === 0 ? 1 : -1;

  const isTurnPoint = matrix[col][row] === 0;

  // The very first line
  if (row === 0) return {bg: tablet[0], dir, isTurnPoint};

  // Picks current thread color on a basis of the turns number (doesn't apply for the first line)
  let turnsSum = -1;
  for (let i = 0; i <= row; i++) {
    turnsSum += matrix[col][i];
  }

  const rest = modulo(turnsSum, tablet.length);
  const bg = tablet[rest];

  return {bg, dir, isTurnPoint};
};

export const genThread = ({
  picks,
  ...props
}: {
  picks: Draft["picks"];
  tablets: Draft["tablets"];
  col: number;
  dirsChanges: MakeDirChange[][];
}) => [...new Array(picks)].map((_x, pick) => genSqrt({row: pick, ...props}));

export const isNumeric = (v: string) =>
  Number.parseInt(v, 10) && !Number.isNaN(v);

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};

export const downLoadFile = (
  data: string[],
  type: string = "application/json",
  name: string = "newFile"
): void => {
  const blob = new Blob([data.join("\n")], {type: type.toString()});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = name;
  a.href = url;
  document.body.append(a);
  a.click();
  a.remove();
};

export const getSkewLabel: Record<Skew, "S" | "Z"> = {"-1": "Z", "1": "S"};

export const getDirLabel = {"-1": "back", "1": "forward"};
