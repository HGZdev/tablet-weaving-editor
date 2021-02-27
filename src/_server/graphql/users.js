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
import bcrypt from 'bcryptjs'

// graphQL types

const User = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {type: GraphQLID},
		firstName: {type: GraphQLString},
		lastName: {type: GraphQLString},
		deleted: {type: GraphQLBoolean},
	}),
})

const UserInput = new GraphQLInputObjectType({
	name: 'UserInput',
	fields: () => ({
		id: {type: GraphQLID},
		firstName: {type: GraphQLString},
		lastName: {type: GraphQLString},
		deleted: {type: GraphQLBoolean},
	}),
})

// graphQL queries and mutations schemas

const queries = {
	user: {
		type: User,
		id: {type: GraphQLInt},
		resolve: async (root, args, {db}) => {
			if (args.id) return db.users.findById(args.id)
			return db.users.findOne({where: {...args}})
		},
	},

	users: {
		type: new GraphQLList(User),
		args: {},
		resolve: async (root, args, {db}) => db.users.findAll({where: args}),
	},
}

const mutations = {
	saveUser: {
		type: User,
		args: {
			user: {type: new GraphQLNonNull(UserInput)},
		},
		resolve: async (root, {user}, {db}) => {
			user.password = user.password && (await bcrypt.hash(user.password, 10))

			const saved = await db.users.upsert({...user})
			return saved[0]?.dataValues
		},
	},
}

export default {queries, mutations}
