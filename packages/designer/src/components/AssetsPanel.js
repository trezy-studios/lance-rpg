// Module imports
import {
	useCallback,
	useState,
} from 'react'





// Local imports
import { NewAssetModal } from 'components/NewAssetModal'
import { Panel } from 'components/Panel'
import { useAssets } from 'context/AssetsContext'
import { useEditor } from 'context/EditorContext'





export function AssetsPanel() {
	const {
		addAssets,
		assets,
	} = useAssets()
	const { openItem } = useEditor()
	const [showNewAssetModal, setShowNewAssetModal] = useState(false)

	const handleAddToProject = useCallback(files => {
		addAssets(files)
		setShowNewAssetModal(false)
	}, [
		addAssets,
		setShowNewAssetModal,
	])

	const handleEditAssetClick = useCallback(({ target }) => {
		const itemID = target.value
		openItem({
			item: assets[target.value],
			itemID,
			type: 'asset',
		})
	}, [
		assets,
		openItem,
	])

	const handleNewAssetClick = useCallback(() => {
		setShowNewAssetModal(true)
	}, [setShowNewAssetModal])

	const handleNewAssetModalClose = useCallback(() => {
		setShowNewAssetModal(false)
	}, [setShowNewAssetModal])

	const Menu = (
		<>
			<button
				onClick={handleNewAssetClick}
				type="button">
				New Asset
			</button>
		</>
	)

	return (
		<>
			<Panel
				className="assets"
				menu={Menu}
				title="Assets">
				<ol className="block-list layers-list">
					{Object.entries(assets).map(([assetID, asset]) => (
						<li key={assetID}>
							<img src={asset.dataURL} />

							<div className="details">{asset.name}</div>

							<menu type="toolbar">
								<button
									data-assetid={assetID}
									onClick={handleEditAssetClick}
									type="button"
									value={assetID}>
									Edit
								</button>

								<button
									onClick={() => {}}
									type="button">
									Remove
								</button>
							</menu>
						</li>
					))}
				</ol>
			</Panel>

			{showNewAssetModal && (
				<NewAssetModal
					onAddToProject={handleAddToProject}
					onClose={handleNewAssetModalClose} />
			)}
		</>
	)
}
