import React from 'react'
import {Box} from 'Components/Box'
import SectionWrap from 'Components/SectionWrap'
import Text, {L, XXL} from 'Components/Text'
import {useQueryPersons} from '../../_server/queries/persons'

const QueryPersons = () => {
	const {value, error, loading} = useQueryPersons()

	if (loading) return <p>Loading...</p>
	if (error) return <p>{`Error: ${error.message}`}</p>

	if (!value) return false

	return (
		<Box column gap>
			<Text sets={[L]} left>
				Query: list of persons
			</Text>
			{value.map((p, i) => (
				<Text key={i} left>
					{`${p.id}: ${p.firstName} ${p.lastName} ${p.date}`}
				</Text>
			))}
		</Box>
	)
}

const Persons = () => (
	<SectionWrap gap>
		<Text sets={[XXL]}>QraphQL / DB queries test</Text>
		<QueryPersons />
	</SectionWrap>
)

export default Persons
