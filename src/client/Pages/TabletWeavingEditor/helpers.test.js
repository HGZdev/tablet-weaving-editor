import {genDirsMatrix, genSqrt, genThread, genDraft} from './helpers'

const dc1 = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
	[0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
]

const matrix1 = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, -1, -1, -1, -1, -1, -1, 0, 1],
	[1, 1, 1, 0, -1, -1, 0, 1, 1, 1],
	[1, 0, -1, -1, -1, 0, 1, 1, 1, 1],
]

const t = [
	['lightblue', 'violet', 'orange', 'yellow'], // A
	['lightblue', 'violet', 'orange', 'yellow'], // B
	['lightblue', 'violet', 'orange', 'yellow'], // C
	['lightblue', 'violet', 'orange', 'yellow'], // D
]

test('TAB_01 genDirsMatrix', () => {
	expect(genDirsMatrix(dc1)).toEqual(matrix1)
})

test('TAB_02 genSqrt', () => {
	const tests = [
		[
			{col: 0, row: 0, dirsChanges: dc1, tablets: t},
			{bg: 'lightblue', dir: 1, isTurnPoint: false},
		],
		[
			{col: 0, row: 3, dirsChanges: dc1, tablets: t},
			{bg: 'yellow', dir: 1, isTurnPoint: false},
		],
		[
			{col: 0, row: 6, dirsChanges: dc1, tablets: t},
			{bg: 'orange', dir: 1, isTurnPoint: false},
		],
		[
			{col: 1, row: 9, dirsChanges: dc1, tablets: t},
			{bg: 'yellow', dir: 1, isTurnPoint: false},
		],
		[
			{col: 2, row: 3, dirsChanges: dc1, tablets: t},
			{bg: 'orange', dir: -1, isTurnPoint: true},
		],
		[
			{col: 2, row: 5, dirsChanges: dc1, tablets: t},
			{bg: 'lightblue', dir: -1, isTurnPoint: false},
		],
		[
			{col: 2, row: 6, dirsChanges: dc1, tablets: t},
			{bg: 'lightblue', dir: 1, isTurnPoint: true},
		],
		[
			{col: 3, row: 3, dirsChanges: dc1, tablets: t},
			{bg: 'orange', dir: -1, isTurnPoint: false},
		],
	]

	for (const [input, output] of tests) {
		expect(genSqrt(input)).toEqual(output)
	}
})

test('TAB_03 genThread & genDraft', () => {
	const thread = genThread({col: 2, picks: 10, dirsChanges: dc1, tablets: t})

	expect(thread.map(({bg}) => bg)).toEqual([
		'lightblue',
		'violet',
		'orange',
		'orange',
		'violet',
		'lightblue',
		'lightblue',
		'violet',
		'orange',
		'yellow',
	])

	expect(thread.map(({dir}) => dir)).toEqual([1, 1, 1, -1, -1, -1, 1, 1, 1, 1])

	const draft = genDraft({picks: 10, dirsChanges: dc1, tablets: t})
	expect(draft).toMatchSnapshot()
})
