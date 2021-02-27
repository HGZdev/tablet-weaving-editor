// graphql config
export const graphql = {
	path: '/graphql',
	introspection: true,
	playground: {
		settings: {
			'request.credentials': 'include',
			'editor.theme': 'light', // possible values: 'dark', 'light'
			'editor.fontSize': 16,
			'editor.fontFamily': `'Droid Sans Mono', 'Monaco', monospace`,
		},
	},
	tracing: true,
}
