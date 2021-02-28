import React from 'react'
import Text, {GREY6_COL, M, S} from 'Components/Text'
import {Box} from 'Components/Box'
import styled from 'styled-components'
import {holeNames} from './helpers'

const skewLabel = {'-1': 'Z', 1: 'S'}

export const ColorBox = styled(Box).attrs()`
	width: ${p => p.size || '1rem'};
	height: ${p => p.size || '1rem'};

	border: ${p => (p.selected ? '3px solid black' : '2px solid lightgrey')};
	${p => p.selected && p.theme.shadow2};
`

const SqrtWrapBox = styled(Box)`
	padding: 0.1rem;
	width: 1.2rem;
	height: 1.6rem;

	border: ${p => p.hasBorder && '1px solid lightgrey'};
	border-bottom: ${p => p.hasBottomLine && '3px solid red'};
`

const SqrtCoreBox = styled(Box)`
	width: 0.8rem;
	height: 1.4rem;

	border: 1px solid black;
	border-radius: 5px;

	transform: skew(${p => (p.skew < 0 && '20deg') || (p.skew > 0 && '-20deg')});
`

export const Sqrt = ({children, wrapProps, hasShape, onClick, ...props}) => {
	return (
		<SqrtWrapBox {...{...wrapProps, onClick}}>
			{children}
			{hasShape && <SqrtCoreBox {...props} />}
		</SqrtWrapBox>
	)
}

export const RowsLabels = ({rows, gap, numeric, reverse}) => {
	if (!rows) return false

	const rowsArr = [...new Array(rows)].map((x, row) => (
		<Sqrt key={row}>
			<Text sets={[S, GREY6_COL]}>{numeric ? row + 1 : holeNames[row]}</Text>
		</Sqrt>
	))

	return (
		<Box gap={gap} column inline>
			<Sqrt />
			{reverse ? rowsArr.reverse() : rowsArr}
			<Sqrt />
		</Box>
	)
}

export const ColLabel = ({col}) => (
	<Sqrt key={col}>
		<Text sets={[S, GREY6_COL]}>{col + 1}</Text>
	</Sqrt>
)

export const ColSkewButton = ({col, skew, onSkewToggle}) => {
	return (
		<Sqrt key={col} cursor onClick={() => onSkewToggle(col)}>
			<Text sets={[M, GREY6_COL]}>{skewLabel[skew]}</Text>
		</Sqrt>
	)
}
