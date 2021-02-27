const makeImageTags = ({imageUrl, imageMeta}) => [
	...(imageUrl
		? [
				{name: 'image', content: imageUrl},
				{property: 'og:image', content: imageUrl},
		  ]
		: []),
	...(imageMeta
		? [
				{property: 'og:image:width', content: imageMeta.w},
				{property: 'og:image:height', content: imageMeta.h},
		  ]
		: []),
]

const makeVideoTags = ({videoUrl, videoMeta}) => [
	...(videoUrl
		? [
				{name: 'video', content: videoUrl},
				{property: 'og:video:url', content: videoUrl},
		  ]
		: []),
	...(videoMeta
		? [
				{property: 'og:video:type', content: videoMeta.type},
				{property: 'og:video:width', content: videoMeta.width || 200},
				{
					property: 'og:video:height',
					content: videoMeta.height || Math.floor(videoMeta.ratio * 200),
				},
		  ]
		: []),
]

// eslint-disable-next-line complexity
export const makeMetaTagsByTag = ({
	appIcon,
	description,
	imageMeta,
	imageUrl,
	keywords,
	title,
	titleSuffix,
	useTitleSuffix,
	videoMeta,
	videoUrl,
}) => {
	const metaTitle = (useTitleSuffix ? title + titleSuffix : title || '').slice(
		0,
		65
	)
	const metaDesc = (description || '').slice(0, 170)

	return {
		title: [{label: metaTitle}],
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0, minimum-scale=1',
			},
			{name: 'og:title', property: 'og:title', content: metaTitle},
			{name: 'description', content: metaDesc},
			{
				name: 'og:description',
				property: 'og:description',
				content: metaDesc,
			},
			{name: 'og:type', property: 'og:type', content: 'website'},

			...(keywords ? [{name: 'keywords', content: keywords || ''}] : []),

			...(imageUrl || imageMeta ? makeImageTags({imageUrl, imageMeta}) : []),
			...(videoUrl || videoMeta ? makeVideoTags({videoUrl, videoMeta}) : []),
		],
		link: [
			{rel: 'apple-touch-icon-precomposed', href: appIcon},
			{rel: 'icon', href: appIcon},
		],
	}
}

// in progress
export const makeItemMetaData = value => {
	if (!value) return
	const {
		title,
		fullTitle,
		fullName,
		label,
		description,
		// imageId,
		videoUrl,
	} = value
	// const origin = global.window?.location?.origin || baseUrl

	return {
		title: fullTitle || title || fullName || label,
		useTitleSuffix: true,
		description,
		// imageUrl: imageId && `${origin}${makeUrl({id: imageId})}`,
		videoUrl,
	}
}
