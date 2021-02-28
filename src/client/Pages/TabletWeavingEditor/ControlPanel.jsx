import React, {useEffect, useState} from 'react'
import Text from '../../Components/Text'
import {Box} from 'Components/Box'
import {InputNumberArrowed, Input} from 'src/client/Components/Inputs'
import {ColorBox} from './Components'
import {WHITE} from 'src/client/styles/index'
import {isEmpty} from 'lodash'
import {BlueButton} from 'src/client/Components/Buttons/TabletButtons'

export const InputsPanel = ({
	draft,
	onHolesChange,
	onPicksChange,
	onTabletsChange,
}) => {
	const {holes, tablets, picks} = draft
	if (isEmpty(tablets)) return false
	return (
		<Box gap inline left wrap>
			<InputNumberArrowed
				{...{
					label: 'holes',
					value: holes,
					min: 2,
					width: '2rem',
					onChange: onHolesChange,
				}}
			/>
			<InputNumberArrowed
				{...{
					label: 'picks',
					value: picks,
					min: 1,
					width: '2rem',
					onChange: onPicksChange,
				}}
			/>
			<InputNumberArrowed
				{...{
					label: 'tablets',
					value: tablets?.length,
					min: 1,
					width: '2rem',
					onChange: onTabletsChange,
				}}
			/>
		</Box>
	)
}

export const colorsDefault = [
	'#000000',
	'#C0C0C0',
	'#0000FF',
	'#008000',
	'#FFFF00',
	'#ffa500',
	'#FF0000',
	'#FFFFFF',
]

export const ColorsPanel = ({
	colors,
	selectedCol,
	setSelectedCol,
	onPaletteColorChange,
}) => {
	const [inputColor, setInputColor] = useState()

	useEffect(
		() =>
			colors[selectedCol] !== inputColor && setInputColor(colors[selectedCol]),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[colors]
	)

	return (
		<Box left gap="0.5rem" column>
			<Box gap="0.1rem" inline>
				{colors?.map((color, i) => (
					<ColorBox
						key={i}
						{...{
							bg: color,
							size: '1.5rem',
							cursor: true,
							selected: selectedCol === i,
							onClick: () => setSelectedCol(i),
						}}
					/>
				))}
			</Box>
			<Box gap="0.5rem" left>
				<Input
					{...{
						type: 'text',
						value: inputColor,
						width: '4rem',
						onChange: v => setInputColor(v.target.value),
					}}
				/>
				<BlueButton
					{...{
						label: 'Change',
						onClick: () => onPaletteColorChange(inputColor),
					}}
				/>
			</Box>
		</Box>
	)
}

const ControlPanel = props => {
	return (
		<Box
			{...{
				inline: true,
				left: true,
				column: true,
				gap: true,
				shadow: 1,
				bg: WHITE,
				padding: '1rem',
			}}
		>
			<Text>Control Panel</Text>
			<InputsPanel {...props} />
			<ColorsPanel {...props} />
		</Box>
	)
}

export default ControlPanel
