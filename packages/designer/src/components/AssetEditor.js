// Module imports
import {
	useEffect,
	useRef,
	useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { Editor } from 'components/Editor'
import { useAssets } from 'context/AssetsContext'





function AssetEditor(props) {
	const { assetID } = props
	const { assets } = useAssets()

	const asset = assets[assetID]

	return (
		<Editor image={asset.image} />
	)
}

AssetEditor.propTypes = {
	assetID: PropTypes.string.isRequired,
}

export { AssetEditor }
