// Module imports
import { ServerEngine } from 'lance-gg'





export class GameServerEngine extends ServerEngine {
	/****************************************************************************\
		Public Methods
	\****************************************************************************/

	constructor(io, gameEngine, inputOptions) {
		super(io, gameEngine, inputOptions)
	}


	onPlayerConnected(socket) {
		super.onPlayerConnected(socket)

		console.log('onPlayerConnected')

		const spawnPlayer = () => this.gameEngine.spawnPlayer(socket.playerId)

		socket.on('requestRestart', spawnPlayer)
		spawnPlayer()
	}

	onPlayerDisconnected(socketId, playerId) {
		super.onPlayerDisconnected(socketId, playerId)

		// iterate through all objects, delete those that are associated with the player
		const playerObjects = this.gameEngine.world.queryObjects({ playerId: playerId })

		playerObjects.forEach(obj => this.gameEngine.removeObjectFromWorld(obj.id))
	}

	start() {
		super.start()
	}
}
