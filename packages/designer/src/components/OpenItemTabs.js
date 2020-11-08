// Module imports
import { useCallback } from 'react'
import classnames from 'classnames'





// Local imports
import { useEditor } from 'context/EditorContext'





function OpenItemTabs() {
	const {
		closeItem,
		openItems,
		focusItem,
		focusedItemID,
	} = useEditor()

	const handleCloseItem = useCallback(({ target }) => {
		closeItem(target.value)
	}, [closeItem])

	const handleFocusItem = useCallback(({ target }) => {
		focusItem(target.value)
	}, [focusItem])

	const openItemValues = Object.values(openItems)

	if (!openItemValues.length) {
		return null
	}

	return (
		<div className="open-items">
			<ol>
				{openItemValues.map(({itemID, item}) => (
					<li
						className={classnames({
							active: focusedItemID === itemID,
							'open-item': true,
						})}
						key={itemID}>
						<button
							className="focus-item"
							onClick={handleFocusItem}
							type="button"
							value={itemID}>
							{item.name}
						</button>
						<button
							className="close-item"
							onClick={handleCloseItem}
							type="button"
							value={itemID}>
							&times;
						</button>
					</li>
				))}
			</ol>
		</div>
	)
}

export { OpenItemTabs }
