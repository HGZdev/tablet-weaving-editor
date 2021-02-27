import React from 'react'
import {Box, ContentBox} from 'Components/Box'
import Text, {ANTI_COL, BOLD, M} from 'Components/Text'

import {MAIN, ANTI, Theme, headerTextTheme} from 'Styles'
import {useLocation} from 'react-router-dom'
import {useMediaQuery} from 'plugins/MediaQuery'
import MenuWithHamburger from 'Components/MenuWithHamburger'
import Link from 'Components/Link'
import {pages} from '../settings'

const Logo = () => {
	const location = useLocation()
	return (
		<Link to={`/${location.search}`}>
			<Text sets={[M, BOLD, ANTI_COL]}>HGZ</Text>
		</Link>
	)
}

const Header = () => {
	const {isPhone} = useMediaQuery()

	return (
		<Theme theme={headerTextTheme}>
			<Box {...{bg: MAIN, fg: ANTI, shadow: 2}}>
				<ContentBox
					{...{
						padding: isPhone ? '0.5rem' : '1rem',
						top: true,
						relative: true,
					}}
				>
					<Box left flex="0">
						<Logo />
					</Box>
					<MenuWithHamburger {...{items: pages}} />
				</ContentBox>
			</Box>
		</Theme>
	)
}

export default Header
