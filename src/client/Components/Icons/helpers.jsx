import React from 'react'
import {Box} from 'Components/Box'
import {styled} from 'Styles'
import {default as Svg} from 'react-inlinesvg'

const ImgWrapBox = styled(Box)`
	svg {
		width: ${p => p.width || p.size};
		height: ${p => p.height || p.size};
	}
`
const SvgBox = styled(Box).attrs({as: Svg})``

export const SvgImage = ({src, size, outerProps, innerProps}) => (
	<ImgWrapBox {...{inline: true, size, ...outerProps}}>
		<SvgBox {...{inline: true, src, ...innerProps}} />
	</ImgWrapBox>
)

export const SvgBgImage = styled(Box).attrs({cursor: true})`
	width: ${p => p.width || p.sizeBg};
	height: ${p => p.height || p.sizeBg};

	border-radius: ${p => p.round && `50%`};

	background-image: url(${p => p.icon});
	background-repeat: no-repeat;
	background-position: center;
	background-size: ${p => p.size};

	transition: 0.5s;
	${p => p.theme.colors}
`
