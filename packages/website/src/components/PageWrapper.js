// Module imports
import { DefaultSeo as DefaultSEO } from 'next-seo'
import PropTypes from 'prop-types'
import React from 'react'





function PageWrapper(props) {
	const {
		children,
	} = props

	return (
		<>
			<DefaultSEO titleTemplate="%s | A Monster's Nature" />

			<main>
				{children}
			</main>
		</>
	)
}

PageWrapper.defaultProps = {
	children: null,
}

PageWrapper.propTypes = {
	children: PropTypes.node,
}

export { PageWrapper }
