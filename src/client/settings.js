import {TabletWeavingEditor} from './Pages'

export const ABOUT = 'about'
export const TABLET_WEAVING = 'tablet-weaving'

export const pages = [
	{
		exact: true,
		path: '/',
		label: 'Tablet weaving',
		component: TabletWeavingEditor,
	},
	// {
	// 	path: `/${ABOUT}`,
	// 	label: 'About',
	// 	component: About,
	// },
]
