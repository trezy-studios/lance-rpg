function createEnums(keys) {
	return keys.reduce((accumulator, key, index) => {
		accumulator[key] = index
		return accumulator
	}, {})
}

function reverseObject(object) {
	return Object.entries(object).reduce((accumulator, [key, value]) => {
		accumulator[value] = key
		return accumulator
	}, {})
}

export const DIRECTION = createEnums([
	'DOWN',
	'LEFT',
	'RIGHT',
	'UP',
])
export const DIRECTION_REVERSE = reverseObject(DIRECTION)

export const STATE = createEnums([
	'CAST',
	'DEATH',
	'HIT',
	'IDLE',
	'WALK',
])
export const STATE_REVERSE = reverseObject(STATE)

export const CHARACTER_HEIGHT = 32
export const CHARACTER_WIDTH = 32
export const WALK_SPEED = 2
