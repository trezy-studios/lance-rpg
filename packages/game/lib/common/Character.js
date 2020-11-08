// Module imports
import {
	BaseTypes,
	DynamicObject,
} from 'lance-gg'





// Local imports
import {
	DIRECTION,
	DIRECTION_REVERSE,
	STATE,
	STATE_REVERSE,
	WALK_SPEED,
} from 'common/data'





export class Character extends DynamicObject {
	constructor(gameEngine, options, props) {
		super(gameEngine, options, props)
	}

	syncTo(other) {
		super.syncTo(other)
		this.direction = other.direction
		this.health = other.health
		this.mana = other.mana
		this.state = other.state
	}





	/****************************************************************************\
		Getters
	\****************************************************************************/

	get animationName() {
		const state = STATE_REVERSE[this.state]
		let { direction } = this

		if (state === STATE.CAST) {
			switch (direction) {
				case DIRECTION.DOWN:
					direction = DIRECTION.RIGHT
					break
				case DIRECTION.UP:
					direction = DIRECTION.LEFT
					break
			}
		}

		direction = DIRECTION_REVERSE[direction]

		return `${state}-${direction}`.toLowerCase()
	}

	static get maxSpeed() {
		return WALK_SPEED
	}

	static get netScheme() {
		return {
			...super.netScheme,
			direction: { type: BaseTypes.TYPES.INT8 },
			health: { type: BaseTypes.TYPES.INT16 },
			mana: { type: BaseTypes.TYPES.INT16 },
			state: { type: BaseTypes.TYPES.INT8 },
		}
	}

	get profession() {
		return 'mage'
	}
}
