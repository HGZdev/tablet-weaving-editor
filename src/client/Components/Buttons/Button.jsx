import React from 'react'

import Link from '../Link'
import {styled} from 'Styles'
import {Box} from '../Box'

const ButtonOrLink = props => {
	const {to, disabled} = props
	if (to && !disabled) {
		return <Link {...props} />
	}
	return <button type="button" {...props} />
}

const Button = styled(p => <Box {...p} as={ButtonOrLink} inline />)`
	${p => {
		return {
			cursor: p.disabled ? 'default' : 'pointer',

			/* somewhat support disabled links (you can still use keyboard) */
			'a&[disabled]': {pointerEvents: 'none'},

			'& > *:only-child': {margin: 'auto'},
		}
	}};

	${p => p.theme.button?.css};
	${p => p.theme.button?.customCss};
`

export default Button
