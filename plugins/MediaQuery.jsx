import React, {createContext, useContext, useState, useEffect} from 'react'

const breakpoints = {
	isNarrow: 460,
	isPhone: 767,
	isTablet: 1024,
}

const mediaConditions = breakpoints => {
	const media = {}
	Object.entries(breakpoints).forEach(
		// eslint-disable-next-line no-return-assign
		bp => (media[bp[0]] = bp[1] > window.innerWidth)
	)
	return media
}

const MediaQueryCtx = createContext()
const MediaQueryProvider = ({children}) => {
	const [media, setMedia] = useState(mediaConditions(breakpoints))

	useEffect(() => {
		const handleResize = () => {
			setMedia(mediaConditions(breakpoints))
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	return (
		<MediaQueryCtx.Provider value={media}>{children}</MediaQueryCtx.Provider>
	)
}
export default MediaQueryProvider
export const useMediaQuery = () => useContext(MediaQueryCtx)
