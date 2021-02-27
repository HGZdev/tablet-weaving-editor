import {GraphQLScalarType, Kind} from 'graphql'

export const DateType = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return Number.parseInt(ast.value, 10) // ast value is always in string format
		}
	},
	parseValue(value) {
		return value && new Date(value) // value from the client
	},
	serialize(value) {
		return value?.toJSON() // value sent to the client
	},
})

export const ObjectScalarType = new GraphQLScalarType({
	name: 'Object',
	description: 'Arbitrary object',
	parseValue: value => {
		return typeof value === 'object'
			? value
			: typeof value === 'string'
			? JSON.parse(value)
			: undefined
	},
	serialize: value => {
		return typeof value === 'object'
			? value
			: typeof value === 'string'
			? JSON.parse(value)
			: undefined
	},
	parseLiteral: ast => {
		switch (ast.kind) {
			case Kind.STRING:
				return JSON.parse(ast.value)
			case Kind.OBJECT:
				throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`)
			default:
		}
	},
})
