import React, {useState} from 'react'
import {Box} from 'Components/Box'
import SectionWrap from 'Components/SectionWrap'
import {GREEN3, GREEN2, RED1, GREY6, GREY4, RED2, WHITE} from 'Styles'
import Text, {BOLD, L, XXL, ACCENT_COL} from 'Components/Text'
import {
	useDeletePerson,
	useQueryPersons,
	useSavePerson,
} from 'src/_server/queries/persons'
import fakerator from 'fakerator'
import {dateFormatter} from '../helpers'
import {CrossIcon} from '../Components/Icons'

const Button = ({children, ...props}) => (
	<Box
		{...{
			inline: true,
			padding: '0.5rem 1rem',
			cursor: true,
			as: 'button',
			type: 'button',
			radius: '1111',
			...props,
		}}
	>
		{children}
	</Box>
)

const AddButton = () => {
	const saveMutation = useSavePerson()
	const fake = fakerator()

	const handleClick = e => {
		e.preventDefault()

		const fakeData = fake.entity.user()
		const newPerson = {
			firstName: fakeData.firstName,
			lastName: fakeData.lastName,
		}

		return saveMutation(newPerson)
	}

	return (
		<Button
			{...{
				bg: GREEN3,
				fg: WHITE,
				hoverBg: GREEN2,
				onClick: e => handleClick(e),
			}}
		>
			Add
		</Button>
	)
}

const DeleteButton = ({id, disabled, setSelected}) => {
	const deleteMutation = useDeletePerson()

	const handleClick = async e => {
		e.preventDefault()
		if (!id) return
		await deleteMutation({id})
		setSelected()
	}
	return (
		<Button
			{...{
				bg: disabled ? GREY6 : RED2,
				fg: disabled ? GREY4 : WHITE,
				hoverBg: !disabled && RED1,
				cursor: !disabled,
				onClick: e => handleClick(e),
			}}
		>
			Delete
		</Button>
	)
}

const Item = ({id, createdAt, firstName, lastName, selected, setSelected}) => {
	return (
		<Box inline>
			<Text {...{sets: [selected === id && ACCENT_COL]}}>
				{`${id}: ${dateFormatter(createdAt)} ${firstName} ${lastName} `}
			</Text>

			<CrossIcon
				{...{
					outerProps: {
						size: '1.5rem',
						padding: '0.5rem',
						cursor: true,
						onClick: () => setSelected(id),
					},
					innerProps: {
						alt: 'delete-icon',
						fill: RED2,
						hoverFill: RED1,
					},
				}}
			/>
		</Box>
	)
}

const PersonsList = ({persons, ...props}) => {
	return (
		<Box left column gap>
			<Text sets={[L, BOLD]}>List of people</Text>
			{!persons?.length && <Text>no results found</Text>}
			{persons.map((item, i) => (
				<Item key={i} {...item} {...props} />
			))}
		</Box>
	)
}

const PersonsPanel = () => {
	const {value, error, loading} = useQueryPersons()
	const [selected, setSelected] = useState()

	if (loading) return <p>Loading...</p>
	if (error) return <p>{`Error: ${error.message}`}</p>

	return (
		<Box column gap maxWidth="20rem">
			<Box gap left>
				<DeleteButton {...{disabled: !selected, id: selected, setSelected}} />
				<AddButton />
			</Box>
			<PersonsList {...{persons: value, selected, setSelected}} />
		</Box>
	)
}

const DatabasePage = () => {
	return (
		<SectionWrap left gap="2rem">
			<Text sets={[XXL]} as="h1">
				<Text sets={[XXL]} uppercase>
					Test:
				</Text>{' '}
				Database + GraphQL
			</Text>

			<PersonsPanel />
		</SectionWrap>
	)
}

export default DatabasePage
