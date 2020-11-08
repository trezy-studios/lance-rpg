// Module imports
import {
	BaseTypes,
	DynamicObject,
	GameEngine,
	KeyboardControls,
	Renderer,
	SimplePhysicsEngine,
	TwoVector,
} from 'lance-gg'





// Local imports
import { Character } from 'common/Character.js'
import { Fireball } from 'common/Fireball.js'
import {
	CHARACTER_HEIGHT,
	CHARACTER_WIDTH,
	DIRECTION,
	STATE,
	WALK_SPEED,
} from 'common/data'





// Local variables
let canvasElement = null
let firebase = null
let firestore = null





export class Game extends GameEngine {
	/****************************************************************************\
		Shared
	\****************************************************************************/

	castSpell(options) {
		console.log('castSpell', options)
	}

	constructor(options) {
		super(options)
		this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this })

		this.on('postStep', this.gameLogic)
	}

	gameLogic = () => {
		const fireballs = this.world.queryObjects({ instanceType: Fireball })
		const characters = this.world.queryObjects({ instanceType: Character })

		// console.log(this.controls)
	}

	// initWorld() {
	// 	super.initWorld({
	// 		height: 500,
	// 		width: 500,
	// 		worldWrap: true,
	// 	})
	// }

	processInput(inputData, playerId) {
		const {
			input,
			options = {},
		} = inputData

		super.processInput(inputData, playerId)

		const character = this.world.queryObject({
			instanceType: Character,
			playerId,
		})

		if (character) {
			switch (input) {
				case 'cast':
					this.castSpell(options)
					character.state = STATE.CAST
					break
				case 'idle':
					character.state = STATE.IDLE
					break
				case 'walk':
					character.direction = options.direction
					character.state = STATE.WALK
					break
			}

			switch (options.direction) {
				case DIRECTION.DOWN:
					character.position.y += WALK_SPEED
					break

				case DIRECTION.LEFT:
					character.position.x -= WALK_SPEED
					break

				case DIRECTION.RIGHT:
					character.position.x += WALK_SPEED
					break

				case DIRECTION.UP:
					character.position.y -= WALK_SPEED
					break
			}
		}
	}

	registerClasses(serializer) {
		serializer.registerClass(Character)
		serializer.registerClass(Fireball)
	}

	spawnPlayer(playerId) {
		const character = new Character(this, null, {
			height: CHARACTER_HEIGHT,
			position: new TwoVector(0, 0),
			width: CHARACTER_WIDTH,
		})

		character.direction = DIRECTION.DOWN,
		character.state = STATE.IDLE,
		character.playerId = playerId

		this.addObjectToWorld(character)
	}
}
