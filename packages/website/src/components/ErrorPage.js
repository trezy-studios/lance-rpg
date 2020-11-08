// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Local constants
const statusMessages = {
	404: 'Probably Gone Forever',
	500: 'Ah crap.',
}





function ErrorPage(props) {
	const {
		statusCode = 500,
	} = props

	return (
		<section>
			<h2><code>{statusCode}</code> {statusMessages[statusCode]}</h2>
		</section>
	)
}

ErrorPage.propTypes = {
	statusCode: PropTypes.number.isRequired,
}





export { ErrorPage }
