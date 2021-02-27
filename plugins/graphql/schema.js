import {GraphQLSchema, GraphQLObjectType} from 'graphql'
import * as allQs from '../../src/_server/graphql'

let queries = {}
let mutations = {}

const models = Object.values(allQs)
models.forEach(model => {
	queries = {...queries, ...model.queries}
	mutations = {...mutations, ...model.mutations}
})

// graphQL Root schema

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'QueryRootType',
		fields: () => ({
			...queries,
		}),
	}),
	mutation: new GraphQLObjectType({
		name: 'MutationRootType',
		fields: () => ({
			...mutations,
		}),
	}),
})

export default schema
