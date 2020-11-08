// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import LocalForage from 'localforage'
import PropTypes from 'prop-types'





const AssetsContext = createContext({
	addAssets: () => {},
	assets: {},
})





const AssetsContextProvider = (props) => {
	const { children } = props

	const [assets, setAssets] = useState({})

	const addAssets = useCallback(async newAssets => {
		// LocalForage
		setAssets(oldAssets => ({
			...oldAssets,
			...newAssets,
		}))
	}, [setAssets])

	return (
		<AssetsContext.Provider
			value={{
				addAssets,
				assets,
			}}>
			{children}
		</AssetsContext.Provider>
	)
}

AssetsContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}





const useAssets = () => useContext(AssetsContext)





export {
	AssetsContext,
	AssetsContextProvider,
	useAssets,
}
