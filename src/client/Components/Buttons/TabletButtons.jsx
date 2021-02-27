import React from 'react'
import {
	BLACK,
	BLUE2,
	BLUE3,
	GREEN2,
	GREEN3,
	WHITE,
} from 'src/client/styles/index'
import {Box} from '../Box'
import Text, {XS} from '../Text'

export const NarrowButton = ({children, disabled, ...props}) => (
	<Box
		{...{
			type: 'button',
			inline: true,
			// padding: '0.5rem 0.5rem',
			cursor: !disabled,
			as: 'button',
			radius: '1111',
			disabled,
			...props,
		}}
	>
		{children}
	</Box>
)

export const RegularButton = ({children, disabled, ...props}) => (
	<Box
		{...{
			type: 'button',
			inline: true,
			padding: '0.3rem 0.5rem',
			cursor: !disabled,
			as: 'button',
			radius: '1111',
			disabled,
			...props,
		}}
	>
		{children}
	</Box>
)

export const BlueButton = ({label, ...p}) => (
	<RegularButton
		{...{
			bg: BLUE3,
			fg: WHITE,
			hoverBg: BLUE2,
			...p,
		}}
	>
		<Text sets={[XS]}>{label}</Text>
	</RegularButton>
)

export const GreenButton = ({label, ...p}) => (
	<RegularButton
		{...{
			bg: GREEN3,
			fg: WHITE,
			hoverBg: GREEN2,
			...p,
		}}
	>
		<Text sets={[XS]}>{label}</Text>
	</RegularButton>
)

export const TransButton = ({label, ...p}) => (
	<NarrowButton
		{...{
			fg: BLACK,
			hoverFg: BLUE2,
			...p,
		}}
	>
		<Text sets={[XS]}>{label}</Text>
	</NarrowButton>
)
