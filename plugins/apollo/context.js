import db from '../../src/_server/database'

export const makeContext = req => {
	// TODO: filter necessary options + add user auth.
	// TODO: attach context to global on render ContextProvider

	return {...req, db}
}
