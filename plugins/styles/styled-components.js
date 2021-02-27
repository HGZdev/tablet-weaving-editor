import React from 'react'
import {ThemeProvider} from 'styled-components'
export {
	default as styled,
	css,
	keyframes,
	createGlobalStyle,
} from 'styled-components'

const merge = (old, cur) => {
	const res = {...old}
	for (const key of Object.keys(cur)) {
		const val = cur[key]
		if (
			res[key] === undefined ||
			typeof val !== 'object' ||
			typeof res[key] !== 'object' ||
			Array.isArray(val)
		) {
			res[key] = val
		} else {
			res[key] = merge(res[key], val)
		}
	}
	return res
}

export const mergeThemes = (...themes) => parent => {
	for (const theme of themes) {
		if (!theme) continue
		if (typeof parent === 'function') {
			parent = theme(parent)
			continue
		}
		parent = merge(parent, theme)
	}
	return parent
}

export const Theme = ({theme, children}) => {
	const mergedTheme =
		theme && (Array.isArray(theme) ? mergeThemes(...theme) : mergeThemes(theme))

	return <ThemeProvider theme={mergedTheme}>{children}</ThemeProvider>
}
