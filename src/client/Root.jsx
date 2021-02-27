import React from 'react'
import {GlobalStyle, Theme, defaultThemesSet} from 'Styles'
import {Route, BrowserRouter} from 'react-router-dom'
import {Header, Footer} from './PageWrappers'
import MediaQueryProvider from 'plugins/MediaQuery'
import PageWrap from './Components/PageWrap'
import ApolloProvider from 'plugins/apollo/ApolloClient'
import {MetaData} from './Components/MetaData'
import {pages} from './settings'

const App = () => {
	return (
		<Theme theme={defaultThemesSet}>
			<MediaQueryProvider>
				<ApolloProvider>
					<BrowserRouter>
						<>
							<GlobalStyle />
							<MetaData />
							<PageWrap header={<Header />} footer={<Footer />}>
								{pages.map(({path, exact, component}, i) => (
									<Route
										key={i}
										{...{
											exact,
											path: `/${path}`,
											component,
										}}
									/>
								))}
							</PageWrap>
						</>
					</BrowserRouter>
				</ApolloProvider>
			</MediaQueryProvider>
		</Theme>
	)
}

export default App
