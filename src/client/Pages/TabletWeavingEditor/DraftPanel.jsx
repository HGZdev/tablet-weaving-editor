import React from 'react'
import {Box} from 'Components/Box'
import {genThread} from './helpers'
import {GREY3, GREY4} from 'src/client/styles'
import {ColLabel, ColSkewButton, RowsLabels, Sqrt} from './Components'
import {isEmpty} from 'lodash'

const Thread = props => {
	const {draft, gap, col, reverse, onDirChange} = props
	const {tablets, skews, picks, dirsChanges} = draft

	if (isEmpty(tablets)) return false

	const thread = genThread({col, tablets, picks, dirsChanges})
	const skew = skews[col]

	const rowsArr = thread?.map(({bg, dir, isTurnPoint}, row) => (
		<Sqrt
			key={row}
			{...{
				hasShape: true,
				bg,
				skew: dir < 0 ? -skew : skew,
				wrapProps: {
					bg: dir < 0 ? GREY3 : GREY4,
					hasBorder: true,
					hasBottomLine: isTurnPoint,
					cursor: true,
				},
				onClick: () => onDirChange({col, row, isTurnPoint}),
			}}
		/>
	))

	return (
		<Box gap={gap} column inline>
			<ColLabel {...{col}} />
			{reverse ? rowsArr.reverse() : rowsArr}
			<ColSkewButton {...{...props, col, skew}} />
		</Box>
	)
}

export const Threads = props =>
	props.draft.tablets?.map((_x, col) => (
		<Thread key={col} {...{...props, col}} />
	))

const DraftPanel = props => {
	const {gap, draft: {picks, tablets} = {}} = props

	return (
		<Box gap={gap}>
			<RowsLabels {...{...props, rows: picks, numeric: true, reverse: true}} />
			{tablets && <Threads {...{...props, reverse: true}} />}
			<RowsLabels {...{...props, rows: picks, numeric: true, reverse: true}} />
		</Box>
	)
}

export default DraftPanel
