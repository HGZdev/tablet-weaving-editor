import React from 'react'
import {isNumeric} from 'src/client/helpers'
import {Input} from './InputBase'

export const InputNumber = props => {
	const {value, onChange, innerWrapProps = {}} = props

	const handleChange = e => {
		e.preventDefault()
		const value = e.target.value
		if (isNumeric(value)) onChange(Number.parseInt(value, 10))
	}

	return (
		<Input
			{...{
				type: 'number',
				onChange: handleChange,
				value,
				innerWrapProps,
				...props,
			}}
		/>
	)
}
