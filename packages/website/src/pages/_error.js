// Module imports
import React from 'react'





// Local imports
import { ErrorPage } from '../components/ErrorPage'
import { PageWrapper } from '../components/PageWrapper'





export default function Error(props) {
	return (
		<PageWrapper {...props}>
			<ErrorPage {...props} />
		</PageWrapper>
	)
}
