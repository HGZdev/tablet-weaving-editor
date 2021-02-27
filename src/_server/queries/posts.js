import gql from 'graphql-tag'
import {useQueryGen, useLazyQueryGen} from './helpers'
import {useMutation} from 'plugins/apollo'

const POST_FIELDS = `
	id
	text
	deleted
	createAt
`

export const postQuery = (fields = POST_FIELDS) => gql`
	query post($id: Int) {
		post(id: $id) {
			${fields}
		}
	}
`

export const postsQuery = (fields = POST_FIELDS) => gql`
	query posts {
		posts {
			${fields}
		}
	}
`

export const useQueryPost = (variables, {fields, ...options} = {}) =>
	useQueryGen({query: postQuery(fields), variables, options})

export const useQueryPosts = (variables, {fields, ...options} = {}) =>
	useQueryGen({query: postsQuery(fields), variables, options})

export const useLazyQueryPosts = (variables, {fields, ...options} = {}) =>
	useLazyQueryGen({query: postsQuery(fields), variables, options})

// Mutations

export const savePostMutation = gql`
	mutation savePost($post: PostInput!) {
		savePost(post: $post) {
			${POST_FIELDS}
		}
	}
`

export const useSavePost = variables => {
	const [saveMutation] = useMutation(savePostMutation)
	return args => {
		return saveMutation({
			variables: {post: {...args, ...variables}},
			refetchQueries: [{query: postsQuery()}],
		})
	}
}
