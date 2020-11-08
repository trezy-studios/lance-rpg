// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import PropTypes from 'prop-types'





const KeyStateContext = createContext({
	keyState: {},
	preventDefaultForAllKeys: () => {},
	preventDefaultForKey: () => {},
	removeKeyFromPreventDefault: () => {},
})





const KeyStateContextProvider = (props) => {
	const { children } = props

	const [keyState, setKeyState] = useState({})
	const [shouldPreventDefault, setShouldPreventDefault] = useState([])

	const handleKeyStateChange = useCallback((event, isPressed) => {
		if (shouldPreventDefault.length && ((shouldPreventDefault === 'all') || shouldPreventDefault.includes(event.key))) {
			console.log('prevented default', Object.entries(keyState).reduce((accumulator, [key, isPressed]) => {
				if (isPressed) {
					accumulator.push(key)
				}
				return accumulator
			}, []))
			event.preventDefault()
		}

		setKeyState(previousState => ({
			...previousState,
			[event.key.toLowerCase()]: isPressed,
		}))
	}, [setKeyState])

	const handleKeydown = useCallback(event => handleKeyStateChange(event, true), [handleKeyStateChange])
	const handleKeyup = useCallback(event => handleKeyStateChange(event, false), [handleKeyStateChange])

	const preventDefaultForAllKeys = useCallback(() => setShouldPreventDefault('all'))

	const preventDefaultForKey = useCallback(key => {
		shouldPreventDefault.every(keys => {
			let keysArray = [keys]

			if (Array.isArray(keys)) {
				keysArray = [...keys]
			}

			keysArray.sort()
		})

		setShouldPreventDefault(previousState => ([
			...previousState,
			key,
		]))
	}, [
		setShouldPreventDefault,
		shouldPreventDefault,
	])

	const removeKeyFromPreventDefault = useCallback(key => {
		setShouldPreventDefault(previousState => {
			return previousState.filter(filterKey => {
				const keyType = typeof key
				const filterKeyType = typeof filterKey

				if (keyType !== filterKeyType) {
					return true
				}

				if ((keyType === 'string') && (filterKeyType === 'string')) {
					return key !== filterKey
				}

				if (Array.isArray(key) && Array.isArray(filterKey)) {
					const lengthMatches = key.length === filterKey.length
					const keysMatch = key.every(oKey => filterKey.includes(oKey))
					return lengthMatches && keysMatch
				}

				return true
			})
		})
	}, [setShouldPreventDefault])

	useEffect(() => {
		document.addEventListener('keydown', handleKeydown)
		document.addEventListener('keyup', handleKeyup)

		return () => {
			document.removeEventListener('keydown', handleKeydown)
			document.removeEventListener('keyup', handleKeyup)
		}
	}, [
		handleKeydown,
		handleKeyup,
	])

	return (
		<KeyStateContext.Provider
			value={{
				keyState,
				preventDefaultForAllKeys,
				preventDefaultForKey,
				removeKeyFromPreventDefault,
			}}>
			{children}
		</KeyStateContext.Provider>
	)
}

KeyStateContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}





const useKeyState = () => useContext(KeyStateContext)





export {
	KeyStateContext,
	KeyStateContextProvider,
	useKeyState,
}
