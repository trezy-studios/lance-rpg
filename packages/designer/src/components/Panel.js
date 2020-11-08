// Module imports
import {
	useCallback,
	useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





function Panel(props) {
	const {
		children,
		className,
		menu,
		title,
	} = props
	const [isOpen, setIsOpen] = useState(false)

	const handleHeaderClick = useCallback(() => {
		setIsOpen(previousState => !previousState)
	}, [setIsOpen])

	return (
		<div
			className={classnames('panel', className)}
			data-open={isOpen}>
			<header onClick={handleHeaderClick}>
				{title}
			</header>

			{Boolean(menu) && (
				<menu
					hidden={!isOpen}
					type="toolbar">
					{menu}
				</menu>
			)}

			<div
				className="panel-content"
				hidden={!isOpen}>
				<div className="panel-scroller">
					{children}
				</div>
			</div>
		</div>
	)
}

Panel.defaultProps = {
	className: '',
	menu: null,
}

Panel.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.node,
	menu: PropTypes.node,
	title: PropTypes.node.isRequired,
}

export { Panel }
