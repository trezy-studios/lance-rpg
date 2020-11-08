// Module imports
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { useEditor } from 'context/EditorContext'
// import { useKeyState } from 'context/KeyStateContext'





function EditorControls() {
	const {
		setScale,
		zoomIn,
		zoomOut,
	} = useEditor()
	const canvasRef = useRef(null)

	// useEffect(() => {
	// 	preventDefaultForKey(['meta', '+'])
	// 	preventDefaultForKey(['meta', 'shift', '='])
	// 	preventDefaultForKey(['meta', '-'])

	// 	if (keyState['meta']) {
	// 		if (keyState['-']) {
	// 			setScale(previousScale => previousScale - 0.5)
	// 		} else if (keyState['+'] || (keyState['shift'] &&  keyState['='])) {
	// 			setScale(previousScale => previousScale + 0.5)
	// 		}
	// 	}

	// 	// removeKeysFromPreventDefault
	// }, [
	// 	keyState,
	// 	preventDefaultForKey,
	// 	setScale,
	// ])

	return (
		<menu
			className="editor-controls"
			type="toolbar">
			<div className="fieldset horizontal">
				<label>Zoom</label>

				<button
					onClick={zoomIn}
					type="button">
					+
				</button>

				<button
					onClick={zoomOut}
					type="button">
					-
				</button>
			</div>
		</menu>
	)
}

export { EditorControls }
