import React from 'react'
import PropTypes from 'prop-types'

const ScrollLink = ({Component = 'a', children, to, ...rest}) => {
	const handleClick = e => {
		e.preventDefault()
		const el = document.querySelector(to)

		// TODO smooth scroll in Safari. It doesn't work well with 'window'. On the other hand, '#appWrap' has to be bind to the element with defined overflow.
		// document.querySelector('#appWrap').scrollTo({
		window.scrollTo({
			top: el.offsetTop,
			behavior: 'smooth',
		})
	}

	return (
		<Component {...{...rest, href: to, onClick: handleClick}}>
			{children}
		</Component>
	)
}
ScrollLink.propTypes = {
	Component: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	children: PropTypes.node,
	to: PropTypes.string,
}

export default ScrollLink
