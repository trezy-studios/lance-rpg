// Module imports
import { Lib } from 'lance-gg'





export const defaultOptions = {
	delayInputCount: 3,
	debug: {},
	scheduler: 'render-schedule',
	serverURL: 'http://localhost:3001',
	syncOptions: {
		sync: 'extrapolate',
		remoteObjBending: 0.8,
		bendingIncrements: 6,
	},
	timeoutInterval: 600,
	traceLevel: Lib.Trace.TRACE_NONE,
	updateRate: 6,
}
