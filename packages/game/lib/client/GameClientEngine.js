// Module imports
import {
	ClientEngine,
	KeyboardControls,
} from 'lance-gg'





// Local imports
import { Character } from 'common/Character'
import { ControlManager } from 'client/ControlManager'
import { GameRenderer } from 'client/GameRenderer'
import {
	DIRECTION,
	STATE,
} from 'common/data'





export class GameClientEngine extends ClientEngine {
	/****************************************************************************\
		Public Methods
	\****************************************************************************/

	constructor(gameEngine, clientEngine) {
		super(gameEngine, clientEngine, GameRenderer)
	}

	start() {
		super.start()

		this.controls = new ControlManager({
			clientEngine: this,
			gameEngine: this.gameEngine,
		})

		this.gameEngine.once('renderer.ready', () => {
			// Create player controls
			this.controls.createControl('walk:up', {
				repeat: true,
				start: ['walk', { direction: DIRECTION.UP }],
				stop: ['idle'],
			})
			this.controls.createControl('walk:left', {
				repeat: true,
				start: ['walk', { direction: DIRECTION.LEFT }],
				stop: ['idle'],
			})
			this.controls.createControl('walk:down', {
				repeat: true,
				start: ['walk', { direction: DIRECTION.DOWN }],
				stop: ['idle'],
			})
			this.controls.createControl('walk:right', {
				repeat: true,
				start: ['walk', { direction: DIRECTION.RIGHT }],
				stop: ['idle'],
			})
			this.controls.createControl('cast', {
				start: ['cast'],
				stop: ['idle'],
			})

			// Bind keys to controls
			this.controls.bindClick(this.renderer.canvasElement, 'cast')
			this.controls.bindKey('KeyW', 'walk:up')
			this.controls.bindKey('KeyA', 'walk:left')
			this.controls.bindKey('KeyS', 'walk:down')
			this.controls.bindKey('KeyD', 'walk:right')
		})
	}
}
