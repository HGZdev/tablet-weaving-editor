import React from 'react'
import {Box, ContentBox} from 'Components/Box'
import {styled, WHITE, css} from 'Styles'

const WideBox = styled(Box)`
	${p =>
		p.imgUrl &&
		css`
			background-image: url(${p => p.imgUrl});
			background-position: center;
			background-size: cover;
			background-blend-mode: normal;
		`}
`

/**
 * Component wrapping each app page
 * @param {{children: Node, bg: string, fg: string, imgUrl: string, top: boolean, gap: string|boolean, padding: string}} props
 */
const SectionWrap = ({children, bg = WHITE, fg, imgUrl, ...rest}) => (
	<WideBox {...{bg, fg, imgUrl, top: true}} stretch>
		<ContentBox {...{padding: '1rem', top: true, ...rest}} column>
			{children}
		</ContentBox>
	</WideBox>
)

export default SectionWrap
