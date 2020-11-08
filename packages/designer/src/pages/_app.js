// Style imports
/* eslint-disable import/no-unassigned-import */
import 'scss/reset.scss'
// import 'scss/lib.scss'
import 'scss/app.scss'
/* eslint-enable */





// Module imports
// import {
// 	config as faConfig,
// 	library as faLibrary,
// } from '@fortawesome/fontawesome-svg-core'
import {
	useEffect,
} from 'react'
// import { createFirestoreInstance } from 'redux-firestore'
// import { Provider } from 'react-redux'
// import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { useRouter } from 'next/router'
import LocalForage from 'localforage'
import NextApp from 'next/app'
import NextHead from 'next/head'
import NProgress from 'nprogress'
// import withRedux from 'next-redux-wrapper'





// Local imports
// import { initStore } from 'store'
// import * as fasIcons from 'helpers/fasIconLibrary'
// import * as fabIcons from 'helpers/fabIconLibrary'
// import * as farIcons from 'helpers/farIconLibrary'
// import * as gtag from 'helpers/gtag'
// import Banner from 'components/Banner'
// import firebase from 'helpers/firebase'
import { AssetsContextProvider } from 'context/AssetsContext'
import { EditorContextProvider } from 'context/EditorContext'
import { KeyStateContextProvider } from 'context/KeyStateContext'





// Configure and populate FontAwesome library
// faConfig.autoAddCss = false
// faLibrary.add(fasIcons)
// faLibrary.add(fabIcons)
// faLibrary.add(farIcons)





function App(props) {
	const {
		Component,
		isServer,
		pageProps,
		store,
	} = props
	const router = useRouter()

	useEffect(() => {
		NProgress.configure({ showSpinner: false })
		LocalForage.config({
			name: 'A Monster\'s Nature',
			storeName: 'designer',
		})
	}, [])

	useEffect(() => {
		const startNProgress = () => NProgress.start()
		const finishNProgress = () => NProgress.done()

		router.events.on('routeChangeStart', startNProgress)
		router.events.on('routeChangeError', finishNProgress)
		router.events.on('routeChangeComplete', finishNProgress)

		return () => {
			router.events.off('routeChangeStart', startNProgress)
			router.events.off('routeChangeError', finishNProgress)
			router.events.off('routeChangeComplete', finishNProgress)
		}
	}, [router.events])

	return (
		<AssetsContextProvider>
			<EditorContextProvider>
				<KeyStateContextProvider>
					<div role="application">
						<NextHead>
							<meta name="viewport" content="initial-scale=1.0, viewport-fit=cover, width=device-width" />

							<link
								href="https://fonts.googleapis.com/css?family=Source+Code+Pro&amp;display=swap"
								rel="stylesheet" />
						</NextHead>

						<Component {...pageProps} />

						<div id="modal-portal" />
					</div>
				</KeyStateContextProvider>
			</EditorContextProvider>
		</AssetsContextProvider>
	)
}

App.getInitialProps = NextApp.getInitialProps





export default App
