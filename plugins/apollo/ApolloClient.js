import React from 'react'
import {
	ApolloProvider as ApolloProviderOrg,
	ApolloClient,
	InMemoryCache,
} from '@apollo/client'
import {graphql, LOCAL_SERVER_PORT, LOCAL_URL, PROD_URL} from '../../config'

const cache = new InMemoryCache()

const {NODE_ENV} = process.env

const BASE_URL =
	NODE_ENV === 'production' ? PROD_URL : `${LOCAL_URL}:${LOCAL_SERVER_PORT}`

const client = new ApolloClient({
	uri: `${BASE_URL}${graphql.path}`,
	cache,
	connectToDevTools: true, // Apollo in browser devtools also in prod mode
})

const ApolloProvider = ({children}) => (
	<ApolloProviderOrg client={client}>{children}</ApolloProviderOrg>
)

export default ApolloProvider
