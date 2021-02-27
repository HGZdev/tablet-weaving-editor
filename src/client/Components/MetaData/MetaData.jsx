import React from 'react'
import {APP_NAME, APP_DESC, APP_ICON_PATH} from 'config'
import {Helmet} from 'react-helmet'
import {makeMetaTagsByTag} from './helpers'

export const metaDataDefault = {
	title: APP_NAME,
	titleSuffix: ` - ${APP_NAME}`,
	description: APP_DESC,
	APP_ICON_PATH,
}

const MetaData = ({metaData = {}}) => {
	const metaTagsArrByTag = makeMetaTagsByTag({...metaDataDefault, ...metaData})

	return (
		<Helmet>
			{Object.entries(metaTagsArrByTag).map(([tag, arr]) => {
				if (tag === 'title')
					return arr.map(({label, ...props}, i) => (
						<title key={i} {...props}>
							{label}
						</title>
					))

				if (tag === 'meta')
					return arr.map((props, i) => <meta key={i} {...props} />)

				if (tag === 'link')
					return arr.map((props, i) => <link key={i} {...props} />)

				return false
			})}
		</Helmet>
	)
}

export default MetaData
