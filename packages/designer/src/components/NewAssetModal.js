// Module imports
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'





// Local imports
import { Modal } from 'components/Modal'





function NewAssetModal(props) {
	const {
		onClose,
		onAddToProject,
	} = props
	const [files, setFiles] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const handleAddToProject = useCallback(() => onAddToProject(files), [
		files,
		onAddToProject,
	])

	const handleFilenameChange = useCallback(({ target }) => {
		const fileID = target.getAttribute('data-fileid')

		setFiles(oldFiles => {
			oldFiles[fileID].name = target.value
			return { ...oldFiles }
		})
	}, [setFiles])

	const handleFileSelect = useCallback(async ({ target }) => {
		setIsLoading(true)

		const promises = Array.from(target.files).map(file => new Promise(resolve => {
			const filereader = new FileReader
			filereader.onload = ({ target: { result } }) => {
				const image = new Image
				image.src = result
				resolve({
					dataURL: result,
					file,
					image,
					isSpritesheet: false,
					name: file.name,
				})
			}
			filereader.readAsDataURL(file)
		}))
		const processedFiles = await Promise.all(promises)
		const filesObject = processedFiles.reduce((accumulator, fileData) => {
			accumulator[uuid()] = fileData
			return accumulator
		}, {})

		setFiles(oldFiles => ({
			...oldFiles,
			...filesObject,
		}))
		setIsLoading(false)
	}, [setFiles])

	const handleFileSpritesheetChange = useCallback(({ target }) => {
		const fileID = target.getAttribute('data-fileid')

		setFiles(oldFiles => {
			oldFiles[fileID].isSpritesheet = target.checked
			return { ...oldFiles }
		})
	}, [setFiles])

	const handleRemoveFile = useCallback(({ target }) => {
		setFiles(oldFiles => {
			delete oldFiles[target.getAttribute('data-fileid')]
			return { ...oldFiles }
		})
	}, [setFiles])

	const filesEntries = Object.entries(files)

	return (
		<Modal
			className="new-assets"
			isLoading={isLoading}
			onClose={onClose}
			title="Create New Asset">
			<form>
				{!Boolean(Object.values(files).length) && (
					<div className="fieldset">
						<label>Select Files</label>
						<input
							accept="image/*"
							multiple
							name="file"
							onChange={handleFileSelect}
							type="file" />
					</div>
				)}

				{Boolean(filesEntries.length) && (
					<>
						<ul className="asset-previews block-list">
							{filesEntries.map(([fileID, fileData]) => (
								<li key={fileID}>
									<img src={fileData.dataURL} />

									<div className="details">
										<div className="fieldset">
											<label htmlFor={`${fileID}-name`}>
												Name
											</label>

											<input
												data-fileid={fileID}
												id={`${fileID}-name`}
												name="name"
												onChange={handleFilenameChange}
												type="text"
												value={fileData.name} />
										</div>

										<div className="fieldset horizontal">
											<label htmlFor={`${fileID}-isSpritesheet`}>
												Spritesheet
											</label>

											<input
												data-fileid={fileID}
												id={`${fileID}-isSpritesheet`}
												name="isSpritesheet"
												onChange={handleFileSpritesheetChange}
												type="checkbox"
												value={fileData.isSpritesheet} />
										</div>
									</div>

									<menu type="toolbar">
										<button
											data-fileid={fileID}
											onClick={handleRemoveFile}
											type="button">
											Remove
										</button>
									</menu>
								</li>
							))}
						</ul>

						<footer>
							<menu type="toolbar">
								<button
									onClick={onClose}
									type="button">
									Cancel
								</button>

								<button
									onClick={handleAddToProject}
									type="button">
									Add to Project
								</button>
							</menu>
						</footer>
					</>
				)}
			</form>
		</Modal>
	)
}

NewAssetModal.propTypes = {
	onAddToProject: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
}

export { NewAssetModal }
