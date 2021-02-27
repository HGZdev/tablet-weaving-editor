import Home from './Pages/Home'
import About from './Pages/About'

export const ABOUT = 'about'

export const pages = [
	{
		exact: true,
		path: '',
		label: 'intro',
		component: Home,
	},
	{
		path: `/${ABOUT}`,
		label: 'About',
		component: About,
	},
]
