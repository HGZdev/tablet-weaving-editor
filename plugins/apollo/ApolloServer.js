import {ApolloServer} from 'apollo-server-express'
import {schema} from '../graphql'
import {graphql} from '../../config'
import {makeContext} from './context'
import dbg from 'debug'

// graphql + apollo server
// playground: http://localhost:8080/graphql
const apolloServer = app => {
	const server = new ApolloServer({
		schema,
		context: req => makeContext(req),
		...graphql,
		path: undefined,
		formatError: error => {
			dbg('error', error)
			return error
		},
	})
	server.applyMiddleware({app, path: graphql.path})
}

export default apolloServer
