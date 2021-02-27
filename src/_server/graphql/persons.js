import {
	GraphQLObjectType,
	GraphQLList,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLBoolean,
} from 'graphql'
import {ObjectScalarType} from '../../../plugins/graphql/types'

// graphQL types

const Person = new GraphQLObjectType({
	name: 'Person',
	fields: () => ({
		id: {type: GraphQLID},
		firstName: {type: GraphQLString},
		lastName: {type: GraphQLString},
		deleted: {type: GraphQLBoolean},
		createdAt: {type: ObjectScalarType},
	}),
})

const PersonInput = new GraphQLInputObjectType({
	name: 'PersonInput',
	fields: () => ({
		id: {type: GraphQLID},
		firstName: {type: GraphQLString},
		lastName: {type: GraphQLString},
		deleted: {type: GraphQLBoolean},
		createdAt: {type: ObjectScalarType},
	}),
})

// graphQL queries and mutations schemas

const queries = {
	person: {
		type: Person,
		id: {type: GraphQLInt},
		resolve: async (root, args, {db}) => {
			if (args.id) return db.persons.findById(args.id)
			return db.persons.findOne({where: {...args}})
		},
	},

	persons: {
		type: new GraphQLList(Person),
		args: {},
		resolve: async (root, args, {db}) => db.persons.findAll({where: args}),
	},
}

const mutations = {
	savePerson: {
		type: Person,
		args: {
			person: {type: new GraphQLNonNull(PersonInput)},
		},
		resolve: async (root, {person}, {db}) => {
			const saved = await db.persons.upsert({...person})
			return saved[0]?.dataValues
		},
	},
	deletePerson: {
		type: GraphQLBoolean,
		args: {
			id: {type: new GraphQLNonNull(GraphQLID)},
		},
		resolve: async (root, {id}, {db}) => {
			const deleted = await db.persons.destroy({where: {id}})
			return deleted
		},
	},
}

export default {queries, mutations}
