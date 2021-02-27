import React, {Component} from 'react'
import SectionWrap from 'Components/SectionWrap'
import Text, {XXL} from 'Components/Text'

class Home extends Component {
	state = {username: undefined}

	async componentDidMount() {
		try {
			const res = await fetch('/api/getUsername')
			const user = await res.json()
			const username =
				user.username[0].toUpperCase() + user.username.slice(1).toLowerCase()

			this.setState({username})
		} catch (err) {
			console.error(err)
			return err
		}
	}

	render() {
		return (
			<SectionWrap>
				<Text sets={[XXL]}>
					{'Hello ' + (this.state.username || 'my friend') + '!'}
				</Text>
			</SectionWrap>
		)
	}
}

export default Home
