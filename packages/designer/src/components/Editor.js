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
import { useKeyState } from 'context/KeyStateContext'





function Editor(props) {
	const { image } = props
	const { keyState } = useKeyState()
	const { zoom } = useEditor()
	const canvasRef = useRef(null)
	const [canvasSize, setCanvasSize] = useState({
		height: 0,
		width: 0,
	})
	const [canvasOffset, setCanvasOffset] = useState({
		x: 0,
		y: 0,
	})
	const [dragOffset, setDragOffset] = useState({
		x: 0,
		y: 0,
	})
	const [dragStart, setDragStart] = useState({
		x: 0,
		y: 0,
	})
	const [isDragging, setIsDragging] = useState(false)

	let cursor = 'auto'

	if (keyState['meta']) {
		cursor = 'grab'

		if (isDragging) {
			cursor = 'grabbing'
		}
	}

	const handleCanvasClick = useCallback(event => {
		if (keyState['meta']) {
			setDragStart({
				x: event.screenX,
				y: event.screenY,
			})
			setIsDragging(true)
		}
	}, [
		keyState,
		setDragStart,
		setIsDragging,
	])

	const handleCanvasRelease = useCallback(() => {
		if (isDragging) {
			setCanvasOffset(previousValue => ({
				x: previousValue.x + dragOffset.x,
				y: previousValue.y + dragOffset.y,
			}))
			setDragOffset(() => ({
				x: 0,
				y: 0,
			}))
			setIsDragging(false)
		}
	}, [
		dragOffset,
		isDragging,
		setCanvasOffset,
		setDragOffset,
		setIsDragging,
	])

	const handleMouseMove = useCallback(event => {
		if (isDragging) {
			const {
				screenX,
				screenY,
				target: canvasEl,
			} = event
			const {
				offsetTop,
				offsetLeft,
			} = canvasEl

			setDragOffset(previousValue => ({
				x: screenX - dragStart.x,
				y: screenY - dragStart.y,
			}))
		}
	}, [
		dragStart,
		isDragging,
		setDragOffset,
	])

	const updateCanvas = useCallback(() => {
		const { parentNode } = canvasRef.current

		const heightMatches = parentNode.clientHeight === canvasSize.height
		const widthMatches = parentNode.clientWidth === canvasSize.width

		if (!heightMatches || !widthMatches) {
			setCanvasSize({
				height: parentNode.clientHeight,
				width: parentNode.clientWidth,
			})
		}
	}, [setCanvasSize])

	useEffect(() => {
		let shouldStop = false

		const render = () => {
			if (shouldStop) {
				return
			}

			const canvasElement = canvasRef.current

			if (!canvasElement) {
				return
			}

			const context = canvasRef.current.getContext('2d')

			const {
				height,
				width,
			} = image
			const offsetX = Math.floor((canvasOffset.x + dragOffset.x) / zoom)
			const offsetY = Math.floor((canvasOffset.y + dragOffset.y) / zoom)

			context.clearRect(0, 0, canvasElement.width, canvasElement.height)

			// Draw the grid
			const gridOffsetX = (32 - (offsetX % 32)) * -1
			const gridOffsetY = (32 - (offsetY % 32)) * -1
			const gridWidth = ((Math.ceil(canvasSize.width / 16) * 16) / zoom) + 64
			const gridHeight = ((Math.ceil(canvasSize.height / 16) * 16) / zoom) + 64

			context.fillStyle = '#eee'
			context.fillRect(gridOffsetX, gridOffsetY, gridWidth, gridHeight)

			context.fillStyle = '#ddd'

			for (let i = 0; i < gridWidth; i += 16) {
				const shouldOffset = Boolean((i / 16) % 2)
				const x = gridOffsetX + i
				let y = gridOffsetY

				if (shouldOffset) {
					y += 16
				}

				for (let iY = 0; iY < gridHeight; iY += 32) {
					context.fillRect(x, y + iY, 16, 16)
				}
			}

			context.drawImage(image, 0, 0, width, height, offsetX, offsetY, width, height)
			requestAnimationFrame(render)
		}

		render()

		return () => {
			shouldStop = true
		}
	}, [
		canvasOffset,
		canvasSize,
		dragOffset,
		image,
		zoom,
	])

	useEffect(() => {
		window.addEventListener('resize', updateCanvas)
		updateCanvas()

		return () => window.removeEventListener('resize', updateCanvas)
	}, [updateCanvas])

	return (
		<div className="editor">
			<canvas
				height={Math.floor(canvasSize.height / zoom)}
				onMouseDown={handleCanvasClick}
				onMouseLeave={handleCanvasRelease}
				onMouseMove={handleMouseMove}
				onMouseUp={handleCanvasRelease}
				ref={canvasRef}
				style={{
					cursor,
					transform: `scale(${zoom})`,
				}}
				width={Math.floor(canvasSize.width / zoom)} />
		</div>
	)
}

Editor.propTypes = {
	// image: PropTypes.instanceof(Image).isRequired,
}

export { Editor }
