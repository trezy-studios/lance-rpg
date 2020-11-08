// Module imports
import { useEffect } from 'react'





export default function Play() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			(async () => {
				const { Game } = await import('@a-monsters-nature/game')
				console.log({Game})
			})()
			// const options = {
			// 	traceLevel: Lib.Trace.TRACE_NONE,
			// 	delayInputCount: 3,
			// 	scheduler: 'render-schedule',
			// 	syncOptions: {
			// 		sync: 'extrapolate',
			// 		remoteObjBending: 0.8,
			// 		bendingIncrements: 6,
			// 	},
			// }
			// const gameEngine = new Game(options)
			// const clientEngine = new ClientEngine(gameEngine, options, GameRenderer)

			// clientEngine.start()

			// return () => clientEngine.disconnect()
		}
	}, [])

	return (
		<>
			<canvas id="game" />
			{/* <div>Play</div> */}
		</>
	)
}
