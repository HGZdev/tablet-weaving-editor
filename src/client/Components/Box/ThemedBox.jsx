import {styled, css} from 'Styles'
import {Box} from 'Components/Box'

const ThemedBox = styled(Box)`
	${(p) =>
		css`
			color: ${p.fg || p.theme.fg};
			background-color: ${p.bg || p.theme.bg};

			& :hover {
				color: ${p.hoverFg || p.theme.hoverFg};
				background-color: ${p.hoverBg || p.theme.hoverBg};
			}
		`}
`

export default ThemedBox
