/* eslint-disable unicorn/no-array-reduce */

export const regexRGBHex = /^(#)((?:[\dA-Fa-f]{3}){1,2})$/

export const holeNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// prevents returning negative results of modulo
const mod = (n, m) => {
	const remain = n % m
	return Math.floor(remain >= 0 ? remain : remain + m)
}

export const genDirsMatrix = dirsChanges => {
	const matrix = []

	for (const [i, colArr] of dirsChanges.entries()) {
		if (!colArr) continue
		let currDir = 1

		for (const dirChange of colArr) {
			if (!matrix[i]) matrix.push([])

			if (dirChange) {
				matrix[i].push(0)
				currDir = -currDir
			} else {
				matrix[i].push(currDir || 0)
			}
		}
		currDir = 1
	}
	return matrix
}

export const genSqrt = ({tablets, row, col, dirsChanges}) => {
	const matrix = genDirsMatrix(dirsChanges)
	const tablet = tablets[col]

	// picks current rotation direction: 1 or -1
	const dirSum = dirsChanges[col]
		.slice(0, row + 1)
		.reduce((sum, a) => sum + a, 0)
	const dir = !dirSum || mod(dirSum, 2) < 1 ? 1 : -1

	const isTurnPoint = matrix[col][row] === 0

	// the very first line
	if (row === 0) return {bg: tablet[0], dir, isTurnPoint}

	// picks current thread color on a basis of the turns number (doesn't apply for the first line)
	const turnsSum =
		matrix[col].slice(0, row + 1).reduce((sum, turn) => sum + turn, 0) - 1

	const rest = mod(turnsSum, tablet.length)
	const bg = tablet[rest]

	return {bg, dir, isTurnPoint}
}

export const genThread = ({picks, ...props}) =>
	[...new Array(picks)]?.map((_x, pick) => genSqrt({row: pick, ...props}))

export const genDraft = ({tablets, ...props}) =>
	tablets?.map((_x, col) => genThread({col, tablets, ...props}))
