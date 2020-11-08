// Module imports
import { createPortal } from 'react-dom'
import classnames from 'classnames'
import PropTypes from 'prop-types'





function Modal(props) {
	const {
		children,
		className,
		isLoading,
		onClose,
		title,
	} = props

	if (typeof window === 'undefined') {
		return null
	}

	return createPortal((
		<div className={classnames('modal', className)}>
			<header>
				<span className="title">{title}</span>

				{Boolean(onClose) && (
					<button
						className="close"
						onClick={onClose}
						type="button">
						&times;
					</button>
				)}
			</header>

			<div className="content">
				{children}

				{isLoading && (
					<div className="loader">
						<span>Loading...</span>
					</div>
				)}
			</div>
		</div>
	), document.querySelector('#modal-portal'))
}

Modal.defaultProps = {
	isLoading: false,
	onClose: null,
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	isLoading: PropTypes.bool,
	onClose: PropTypes.func,
	title: PropTypes.string.isRequired,
}

export { Modal }
