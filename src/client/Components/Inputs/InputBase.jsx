import React, {Fragment} from 'react'
import {Box} from 'Components/Box'
import styled from 'styled-components'
import {GREY4} from 'src/client/styles/index'
import Text, {XS} from '../Text'

const InputWrapBox = styled(Box)``

const InputBox = styled(Box).attrs({as: 'input', inline: true})`
	padding: 0.5rem;
	border: 1px solid ${GREY4};
	${p => p.theme.radius1111};
`
const LabelBox = styled(Box).attrs({as: 'label'})``

// eslint-disable-next-line default-param-last
export const Input = ({
	innerWrapProps = {},
	InnerComponentWrap = Fragment,
	labelOnLeft,
	label,
	id: idOrg = 'input-box',
	...props
}) => {
	const id = label ? `input-${label?.replace(' ', '-')}` : idOrg

	return (
		<InputWrapBox left inline column={!labelOnLeft} gap="0.5rem">
			{label && (
				<LabelBox left {...{htmlFor: id}}>
					<Text sets={[XS]}>{label}</Text>
				</LabelBox>
			)}
			<InnerComponentWrap {...innerWrapProps}>
				<InputBox {...{...props, id}} />
			</InnerComponentWrap>
		</InputWrapBox>
	)
}
