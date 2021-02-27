import React from 'react'
import {Link as LinkOrg} from 'react-router-dom'
import Text, {LINK} from './Text'

// TODO noRoute is a hot fix - need for better solution
const Link = ({noRoute, to, ...p}) => (
	<Text
		sets={[LINK]}
		underlineOnHover
		cursor
		{...p}
		as={noRoute ? 'a' : LinkOrg}
		href={noRoute && to}
		to={noRoute ? 'null' : to}
	/>
)

export default Link
