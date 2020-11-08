// Module imports
import React from 'react'





// Local imports
import { ErrorPage } from '../components/ErrorPage'
import { PageWrapper } from '../components/PageWrapper'





export default function P404(props) {
	return (
		<PageWrapper {...props}>
			<ErrorPage statusCode={404} />
		</PageWrapper>
	)
}
