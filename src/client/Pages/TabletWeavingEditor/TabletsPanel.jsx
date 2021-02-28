import React from 'react'
import {Box} from 'Components/Box'
import {GREY4} from 'src/client/styles'
import {ColLabel, ColSkewButton, RowsLabels, Sqrt} from './Components'

export const Tablet = props => {
	const {draft, gap, col, reverse, onColorChange} = props
	const {tablets, skews} = draft

	const tablet = tablets[col]
	const skew = skews[col]
	const rowsArr = tablet.map((bg, row) => (
		<Sqrt
			key={row}
			{...{
				hasShape: true,
				wrapProps: {
					bg: GREY4,
					hasBorder: true,
				},
				bg,
				skew,
				cursor: true,
				onClick: () => onColorChange({col, row}),
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

export const Tablets = props =>
	props.draft?.tablets &&
	props.draft.tablets.map((_x, col) => (
		<Tablet key={col} {...{...props, col, reverse: true}} />
	))

const TabletsPanel = props => {
	const {gap, draft: {holes, tablets} = {}} = props

	return (
		<Box gap={gap}>
			<RowsLabels {...{...props, rows: holes}} />
			{tablets && <Tablets {...props} />}
			<RowsLabels {...{...props, rows: holes}} />
		</Box>
	)
}

export default TabletsPanel
