import {styled, css} from 'Styles'

export const BOLD = 'BOLD'
export const NORMAL = 'NORMAL'
export const THIN = 'THIN'
export const ITALIC = 'ITALIC'

export const MAIN_COL = 'MAIN_COL'
export const ANTI_COL = 'ANTI_COL'
export const ACCENT_COL = 'ACCENT_COL'
export const BLUE4_COL = 'BLUE4_COL'
export const GREY6_COL = 'GREY6_COL'

export const XXXL = 'XXXL'
export const XXL = 'XXL'
export const XL = 'XL'
export const L = 'L'
export const M = 'M'
export const S = 'S'
export const XS = 'XS'

export const UL = 'UL'
export const OL = 'OL'
export const LINK = 'LINK'

const Text = styled.span`
	${p => p.theme.text?.css};

	${p => p.theme.text?.[p.set || M]};
	${p => p.sets?.filter(Boolean).map(set => p.theme.text?.[set])};

	${p => p.uppercase && `text-transform: uppercase`};
	${p => p.cursor && `cursor: pointer`};

	transition: 0.5s;
	${p =>
		p.underlineOnHover &&
		css`
			:hover {
				text-decoration: underline;
			}
		`};
`

export default Text
