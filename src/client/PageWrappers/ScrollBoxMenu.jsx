import React from 'react'
import {useLocation} from 'react-router-dom'
import {styled} from 'Styles'
import {Box} from 'Components/Box'
import {useMediaQuery} from 'plugins/MediaQuery'
import Link from '../Components/Link'

/* horizontal scroll: container must have defined width, noWrap on children and display: inline-block (no inline-flex === <Box inline/>) */
const MenuBox = styled(Box)`
	display: ${p => (p.overflow ? ' inline-block' : 'flex')};
	width: 100vw;
	overflow-x: scroll;
	overflow-y: hidden;
	/* IE 10+ */
	-ms-overflow-style: none;
	/* Firefox */
	scrollbar-width: none;

	/* Safari and Chrome */
	::-webkit-scrollbar {
		display: none;
	}

	* {
		white-space: nowrap;
	}
`
/* horizontal scroll: each element to scroll AND their children must be inline (no flex; no text wrap; only inner can define height => <label><Box inline padding="1rem 0"/></label> in OK  */
const BoxLinkWrap = styled(Box)`
	display: ${p => (p.overflow ? ' inline' : 'flex')};
`

const ScrollBoxMenu = ({links}) => {
	const {isPhone} = useMediaQuery()
	const location = useLocation()

	return (
		<MenuBox
			padding={isPhone ? '0.5rem 1rem 1rem' : '1rem'}
			right={!isPhone}
			inline={!isPhone}
			overflow={isPhone}
			gap
		>
			{links.map((link, i) => (
				<BoxLinkWrap key={i} overflow={isPhone} inline>
					<Link
						to={`/${link.destination}${location.search}`}
						padding={isPhone ? '0 1rem 0 0 ' : '0.5rem'}
					>
						{link.label}
					</Link>
				</BoxLinkWrap>
			))}
		</MenuBox>
	)
}
export default ScrollBoxMenu
