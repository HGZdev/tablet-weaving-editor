/* eslint-disable complexity */
import {styled} from 'Styles'

const vertical = p => (p.top ? 'flex-start' : p.bottom ? 'flex-end' : 'center')
const horizontal = p =>
	p.left ? 'flex-start' : p.right ? 'flex-end' : 'center'

const Box = styled.div`
	${p => {
		const gap = p.gap === true ? p.theme.gap : p.gap
		return {
			position: p.relative ? 'relative' : p.absolute ? 'absolute' : false,

			display: p.inline ? 'inline-flex' : 'flex',

			// Size
			padding: p.padding === true ? gap : p.padding,
			margin: p.wrap && gap ? `-calc(${gap}/2)` : p.margin,
			width: p.width || p.size || (!(p.fitChildren || p.inline) && `100%`),
			height: p.height || p.size,
			minWidth: p.minWidth,
			maxWidth: p.maxWidth,
			minHeight: p.minHeight,
			maxHeight: p.maxHeight,

			// Children layout
			flexWrap: p.wrap && 'wrap',
			flexDirection: p.column
				? 'column'
				: p.columnReverse
				? 'column-reverse'
				: undefined,
			justifyContent: p.spaceBetween
				? 'space-between'
				: p.spaceAround
				? 'space-around'
				: p.spaceEvenly
				? 'space-evenly'
				: p.column
				? vertical(p)
				: horizontal(p),
			alignItems: p.stretch
				? 'stretch'
				: p.column
				? horizontal(p)
				: vertical(p),
			flex: p.flex,
			order: p.order && String(p.order),

			// Gap between children
			// For flex we use negative + positive margin
			'& > *:not(:last-child)': !p.wrap &&
				gap && {
					[`margin-${p.column ? 'bottom' : 'right'}`]: gap,
				},
			'& > *': p.wrap &&
				gap && {
					margin: `calc(${gap}/2)`,
				},
		}
	}};

	${p => p.theme.boxCss}
`

export default Box
