export class ControlManager {
	/****************************************************************************\
		Class Properties
	\****************************************************************************/

	clickBinding = null

	controlBindings = {}

	controls = {}

	keyState = {}





	/****************************************************************************\
		Private Methods
	\****************************************************************************/

	#handleClick = event => {
		const {
			clientX,
			clientY,
		} = event

		const control = this.controls[this.clickBinding]
		const [controlName, options] = control.start
		this.clientEngine.sendInput(controlName, {
			...options,
			x: Math.round(clientX),
			y: Math.round(clientY),
		})
	}

	#bindControls() {
		document.addEventListener('keydown', this.#handleKeydown)
		document.addEventListener('keyup', this.#handleKeyup)
	}

	#handleKeydown = event => {
		const { code } = event

		if (this.controlBindings[code]) {
			this.keyState[code].isActive = true
		}
	}

	#handleKeyup = event => {
		const { code } = event

		if (this.controlBindings[code]) {
			this.keyState[code].isActive = false
		}
	}

	#handlePreStep = () => {
		const keys = Object.keys(this.controlBindings)

		keys.forEach(key => {
			const controlBinding = this.controlBindings[key]
			const control = this.controls[controlBinding]
			const keyState = this.keyState[key]

			if (keyState.isActive && (control.repeat || (keyState.triggerCount === 0))) {
				keyState.triggerCount += 1
				this.clientEngine.sendInput(...control.start)
			} else if (!keyState.isActive && keyState.triggerCount !== 0) {
				keyState.triggerCount = 0
				if (control.stop) {
					this.clientEngine.sendInput(...control.stop)
				}
			}
		})
	}





	/****************************************************************************\
		Public Methods
	\****************************************************************************/

	bindClick(target, control) {
		this.clickBinding = control
		target.addEventListener('click', this.#handleClick)
	}

	bindKey(key, control) {
		this.controlBindings[key] = control
		this.keyState[key] = {
			isActive: false,
			triggerCount: 0,
		}
	}

	constructor(options) {
		const {
			autostart = true,
			clientEngine,
			gameEngine,
		} = options

		this.clientEngine = clientEngine
		this.gameEngine = gameEngine

		this.#bindControls()

		if (autostart) {
			this.start()
		}
	}

	createControl(name, options) {
		this.controls[name] = {
			repeat: false,
			...options,
		}
	}

	pause() {
		this.gameEngine.off('client__preStep', this.#handlePreStep)
	}

	start() {
		this.gameEngine.on('client__preStep', this.#handlePreStep)
	}
}
