// Style imports
import '../scss/reset.scss'
// import '../scss/lib.scss'
import '../scss/app.scss'





// Module imports
// import LocalForage from 'localforage'
// import NextHead from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { AuthenticationContextProvider } from '../context/AuthenticationContext'
// import { Banner } from '../components/Banner'
// import { Brand } from '../components/Brand'





function App({ Component, pageProps }) {
	// LocalForage.config({
	// 	name: 'fdgt.dev',
	// 	storeName: 'webStore',
	// })

	return (
		<AuthenticationContextProvider>
			<Component {...pageProps} />
		</AuthenticationContextProvider>
	)
}

App.propTypes = {
	Component: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.node,
	]).isRequired,
	pageProps: PropTypes.object.isRequired,
}





export default App
