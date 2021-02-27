import {
	GraphQLObjectType,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLInputObjectType,
	GraphQLNonNull,
} from 'graphql'
import {DateType} from '../../../plugins/graphql/types'

// graphQL types

const Post = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		id: {type: GraphQLInt},
		text: {type: GraphQLString},
		deleted: {type: GraphQLBoolean},
		createAt: {type: GraphQLString},
	}),
})

const PostInput = new GraphQLInputObjectType({
	name: 'PostInput',
	fields: () => ({
		id: {type: GraphQLInt},
		text: {type: GraphQLString},
		deleted: {type: GraphQLString},
	}),
})

// graphQL queries and mutations schemas

const queries = {
	post: {
		type: Post,
		id: {type: GraphQLInt},
		resolve: async (root, args, {db}) => {
			if (args.id) return db.posts.findById(args.id)
			return db.posts.findOne({where: {...args}})
		},
	},

	posts: {
		type: new GraphQLList(Post),
		args: {},
		resolve: async (root, args, {db}) => db.posts.findAll({where: args}),
	},
}

const mutations = {
	savePost: {
		type: Post,
		args: {
			post: {type: new GraphQLNonNull(PostInput)},
		},
		resolve: async (root, {post}, {db}) => {
			const saved = await db.posts.upsert({...post})
			return saved[0]?.dataValues
		},
	},
}

export default {queries, mutations}
