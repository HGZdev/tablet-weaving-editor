import {css} from '.'

/* https://allthingssmitty.com/2017/01/09/css-reset-for-minimalists/ */

/* CSS Box model reset */

const ResetBoxModel = css`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	html {
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}
`

export default ResetBoxModel
