import React, {useRef, useState} from 'react'
import {Box} from 'Components/Box'
import Text, {M, ANTI_COL} from 'Components/Text'
import {styled, css, MAIN, ANTI} from 'Styles'
import {useLocation} from 'react-router-dom'
import {useMediaQuery} from 'plugins/MediaQuery'
import Link from 'Components/Link'

const MenuInput = styled(Box)``

const MenuLabel = styled(Box)``

const MenuIcon = styled(Box).attrs({
	size: 2, // px,
})`
	position: absolute;
	height: ${p => p.size}px;
	width: 100%;

	background-color: ${ANTI};
	border-radius: 5px;

	::before,
	::after {
		content: '';
		position: absolute;
		left: 0;
		height: ${p => p.size}px;
		width: 100%;

		background: ${ANTI};
		border-radius: 5px;

		transition: 0.3s ease-in-out;
	}
	::before {
		top: -${p => p.size * 3}px;
	}
	::after {
		bottom: -${p => p.size * 3}px;
	}
`

const ListWrap = styled(Box)`
	${p =>
		p.isPhone &&
		css`
			padding: 0.5rem;
			display: none;

			position: fixed;
			top: 2.7rem;
			left: 0;
			width: 100vw;
			max-height: calc(100vh - 2.7rem);
			height: 0;

			background-color: ${MAIN};

			/* overflow stuff */
			overflow-x: hidden;
			overflow-y: scroll;
			/* IE 10+ */
			-ms-overflow-style: none;
			/* Firefox */
			scrollbar-width: none;

			/* Safari and Chrome */
			::-webkit-scrollbar {
				display: none;
			}

			z-index: 1000;
		`}
`

const ListItem = ({_id, path, label, pages, onClose}) => {
	const location = useLocation()
	const [open, setOpen] = useState()
	const {isPhone} = useMediaQuery()
	return (
		<Box
			{...{
				as: 'li',
				column: true,
				left: true,
				padding: isPhone && '0 0 0 0.5rem',
				inline: !isPhone,
			}}
		>
			<Box gap spaceBetween>
				<Link to={`/${path}${location.search}`} onClick={e => onClose(e)}>
					<Text sets={[M, ANTI_COL]}>
						{label
							?.split('')
							.map((n, i) => (i ? n : n.toUpperCase()))
							.join('')}
					</Text>
				</Link>

				{isPhone && pages && (
					<Box
						{...{
							right: true,
							inline: true,
							padding: '0 0.5rem',
							as: Link,
							onClick: () => setOpen(!open),
						}}
					>
						{open ? '-' : '+'}
					</Box>
				)}
			</Box>
			{open && (
				<Box as="ul" top column left>
					{pages?.map((item, i) => (
						<ListItem key={i} {...{...item, onClose}} />
					))}
				</Box>
			)}
		</Box>
	)
}

const List = ({items, onClose}) => {
	const {isPhone} = useMediaQuery()
	if (!items) return false
	return (
		<ListWrap
			{...{
				as: 'ul',
				gap: '1rem',
				top: true,
				right: !isPhone,
				left: isPhone,
				column: isPhone,
				isPhone,
			}}
		>
			{items
				.filter(({noLink}) => !noLink)
				.map((item, i) => (
					<ListItem key={i} {...{...item, onClose}} />
				))}
		</ListWrap>
	)
}

const MenuWrap = styled(Box)`
	${MenuLabel} {
		z-index: 1;
		position: relative;
		width: 1.5rem;
		height: 1.5rem;
	}

	${MenuInput} {
		opacity: 0;

		&:checked ~ {
			${MenuLabel} ${MenuIcon} {
				background: transparent;
				::before {
					top: 0;
					transform: rotate(45deg);
				}
				::after {
					bottom: 0;
					transform: rotate(-45deg);
				}
			}

			${List} {
				transition: all 0.3s ease-in;
				${ListWrap} {
					display: flex;
					height: auto;
					/* height: 100%; // well defined height guarantees proper animation */
				}
			}
		}
	}
`

const MenuWithHamburger = ({items}) => {
	const {isPhone} = useMediaQuery()
	const menuCheckBox = useRef()

	const handleClose = () => {
		if (menuCheckBox?.current) menuCheckBox.current.checked = false
	}

	if (!items) return false
	return (
		<MenuWrap right>
			{isPhone && (
				<>
					<MenuInput
						as="input"
						type="checkbox"
						id="menu-input"
						ref={menuCheckBox}
					/>
					<MenuLabel as="label" htmlFor="menu-input" inline cursor>
						<MenuIcon />
					</MenuLabel>
				</>
			)}
			<List {...{items, onClose: handleClose}} />
		</MenuWrap>
	)
}

export default MenuWithHamburger
