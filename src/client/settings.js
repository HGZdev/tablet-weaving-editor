import {Home, TextPage, DatabasePage} from './Pages'

export const HOME = 'home'
export const TEXT_PAGE = 'text-page'
export const DB_PAGE = 'db-page'

export const pages = [
	{
		exact: true,
		path: '',
		label: 'intro',
		component: Home,
	},
	{
		path: TEXT_PAGE,
		label: 'Text',
		component: TextPage,
		pages: [
			{path: `${TEXT_PAGE}/me`, label: 'Me'},
			{path: `${TEXT_PAGE}/you`, label: 'You'},
		],
	},
	{
		path: DB_PAGE,
		label: 'Database',
		component: DatabasePage,
		pages: [
			{path: `${DB_PAGE}/superLongName`, label: 'Super Long Name'},
			{path: `${DB_PAGE}/you`, label: 'You'},
		],
	},
]
