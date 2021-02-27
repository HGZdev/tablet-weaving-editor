import gql from 'graphql-tag'
import {useQueryGen, useLazyQueryGen} from './helpers'
import {useMutation} from 'plugins/apollo'

const USER_FIELDS = `
	id
	firstName
	lastName
	password
	deleted
`

export const userQuery = (fields = USER_FIELDS) => gql`
	query user($id: Int) {
		user(id: $id) {
			${fields}
		}
	}
`

export const usersQuery = (fields = USER_FIELDS) => gql`
	query users {
		users {
			${fields}
		}
	}
`

export const useQueryUser = (variables, {fields, ...options} = {}) =>
	useQueryGen({query: userQuery(fields), variables, options})

export const useQueryUsers = (variables, {fields, ...options} = {}) =>
	useQueryGen({query: usersQuery(fields), variables, options})

export const useLazyQueryUsers = (variables, {fields, ...options} = {}) =>
	useLazyQueryGen({query: usersQuery(fields), variables, options})

// TODO: Mutations

export const saveUserMutation = gql`
	mutation saveUser($user: UserInput!) {
		saveUser(user: $user) {
			${USER_FIELDS}
		}
	}
`

export const useSaveUser = variables => {
	const [saveMutation] = useMutation(saveUserMutation)
	return args => {
		return saveMutation({
			variables: {user: {...args, ...variables}},
			refetchQueries: [{query: usersQuery()}],
		})
	}
}
