import {useLazyQuery, useQuery} from 'plugins/apollo'

export const useQueryGen = ({query, variables, options}) => {
	const {data, error, ...rest} = useQuery(query, {variables, ...options})

	const name =
		query?.definitions[0].name.value || (data && Object.keys(data)[0])
	const value = data?.[name]

	if (error) {
		error.graphQLErrors.forEach(({message}) =>
			// eslint-disable-next-line no-console
			console.error('Query failed:', message)
		)
	}

	return {...rest, error, data, value}
}

export const useLazyQueryGen = ({query, variables, options}) => {
	const [load, {data, error, ...rest}] = useLazyQuery(query, {
		variables,
		...options,
	})

	const name =
		query?.definitions[0].name.value || (data && Object.keys(data)[0])
	const value = data?.[name]

	if (error) {
		error.graphQLErrors.forEach(({message}) =>
			// eslint-disable-next-line no-console
			console.error('Query failed:', message)
		)
	}

	return {...rest, error, data, value, load}
}
