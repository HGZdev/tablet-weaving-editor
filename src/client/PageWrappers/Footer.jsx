import React, {useState} from 'react'
import {MAIN, styled, ANTI, ACCENT, GREY2, BLACK} from 'Styles'
import {Box, ContentBox} from 'Components/Box'
import {useMediaQuery} from 'plugins/MediaQuery'
import Text, {S} from 'Components/Text'
import {TelIcon, EmailIcon, GithubIcon, LinkedinIcon} from 'Components/Icons'
import {EMAIL, TEL, GITHUB, LINKEDIN} from 'config'

const BannerBox = styled(Box)`
	position: absolute;
	bottom: calc(100% + 1.5rem);
	left: 0;
	padding: 0.4rem;
	width: 8rem;
`

const LinkBox = ({href, showBanner, Icon}) => {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	return (
		<Box
			relative
			inline
			cursor
			{...{
				bg: ANTI,
				fg: BLACK,
				radius: 'round',
				width: '1.7rem',
				height: '1.7rem',
				as: href && 'a',
				href,
				target: href && '_blank',
				rel: href && 'noopener noreferrer',
				onClick: showBanner && handleClick,
			}}
		>
			{show && (
				<BannerBox {...{bg: ACCENT, fg: ANTI, radius: '1111', shadow: 1}}>
					<Text sets={[S]}>{TEL}</Text>
				</BannerBox>
			)}
			<Icon
				{...{
					outerProps: {size: '1.2rem', padding: '0.1rem'},
					innerProps: {fill: GREY2, hoverFill: BLACK},
				}}
			/>
		</Box>
	)
}

const Footer = () => {
	const {isPhone} = useMediaQuery()

	return (
		<Box {...{id: 'footer', bg: MAIN, fg: ANTI, shadow: 22}}>
			<ContentBox {...{padding: '1rem', column: isPhone, gap: true}}>
				<Box gap="0.7rem" left={!isPhone}>
					<LinkBox
						{...{
							Icon: TelIcon,
							href: isPhone && `tel:${TEL}`,
							showBanner: !isPhone,
						}}
					/>
					<LinkBox {...{Icon: EmailIcon, href: `mailto: ${EMAIL}`}} />
					<LinkBox {...{Icon: GithubIcon, href: GITHUB}} />
					<LinkBox {...{Icon: LinkedinIcon, href: LINKEDIN}} />
				</Box>
				<Box fg={ANTI} right={!isPhone}>
					<Text as="a" href={`mailto: ${EMAIL}`}>
						HGZ &copy; {new Date().getFullYear()}
					</Text>
				</Box>
			</ContentBox>
		</Box>
	)
}

export default Footer
