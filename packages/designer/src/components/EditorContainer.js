// Local imports
import { AssetEditor } from 'components/AssetEditor'
import { EditorControls } from 'components/EditorControls'
import { OpenItemTabs } from 'components/OpenItemTabs'
import { useEditor } from 'context/EditorContext'





function EditorContainer() {
	const {
		focusedItemID,
		openItems,
	} = useEditor()

	return (
		<div className="editor-container">
			<OpenItemTabs />

			{Boolean(focusedItemID) && (
				<>
					{(openItems[focusedItemID]?.type === 'asset') && (
						<AssetEditor assetID={focusedItemID} />
					)}

					<EditorControls />
				</>
			)}
		</div>
	)
}

export { EditorContainer }
