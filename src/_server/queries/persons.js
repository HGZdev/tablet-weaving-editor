import gql from 'graphql-tag'
import {useQueryGen, useLazyQueryGen} from './helpers'
import {useMutation} from 'plugins/apollo'

const PERSON_FIELDS = `
	id
	firstName
	lastName
	deleted
	createdAt
`

export const personQuery = (fields = PERSON_FIELDS) => gql`
	query person($id: Int) {
		person(id: $id) {
			${fields}
		}
	}
`

export const personsQuery = (fields = PERSON_FIELDS) => gql`
	query persons {
		persons {
			${fields}
		}
	}
`

export const useQueryPerson = (variables, {fields, ...options} = {}) =>
	useQueryGen({query: personQuery(fields), variables, options})

export const useQueryPersons = (variables, {fields, ...options} = {}) =>
	useQueryGen({query: personsQuery(fields), variables, options})

export const useLazyQueryPersons = (variables, {fields, ...options} = {}) =>
	useLazyQueryGen({query: personsQuery(fields), variables, options})

//  Mutations

export const savePersonMutation = gql`
	mutation savePerson($person: PersonInput!) {
		savePerson(person: $person) {
			${PERSON_FIELDS}
		}
	}
`
export const deletePersonMutation = gql`
	mutation deletePerson($id: ID!) {
		deletePerson(id: $id)
	}
`

export const useSavePerson = variables => {
	const [saveMutation] = useMutation(savePersonMutation)
	return args => {
		return saveMutation({
			variables: {person: {...args, ...variables}},
			refetchQueries: [{query: personsQuery()}],
		})
	}
}

export const useDeletePerson = () => {
	const [deleteMutation] = useMutation(deletePersonMutation)
	return ({id}) => {
		return deleteMutation({
			variables: {id},
			refetchQueries: [{query: personsQuery()}],
		})
	}
}
