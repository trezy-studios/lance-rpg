// Module imports
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { firestore } from '../helpers/firebase'
import { useFirebaseAuthentication } from '../hooks/useFirebaseAuthentication'




const AuthenticationContext = React.createContext({
	login: () => {},
	logout: () => {},
	user: null,
})





const AuthenticationContextProvider = props => {
	const { children } = props

	// const [user, setUser] = useState(null)

	const user = useFirebaseAuthentication()

	return (
		<AuthenticationContext.Provider
			value={{
				login: () => {},
				logout: () => {},
				user,
			}}>
			{children}
		</AuthenticationContext.Provider>
	)
}

AuthenticationContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}





export {
	AuthenticationContext,
	AuthenticationContextProvider,
}
