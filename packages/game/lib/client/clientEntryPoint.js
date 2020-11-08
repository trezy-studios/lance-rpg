// Module imports
// import { Lib } from 'lance-gg/dist/client/lance-gg'





// Local imports
import { Game } from 'common/Game'
import { GameClientEngine } from 'client/GameClientEngine'
import { defaultOptions } from 'common/defaultOptions'





const gameEngine = new Game(defaultOptions)
const clientEngine = new GameClientEngine(gameEngine, defaultOptions)

document.addEventListener('DOMContentLoaded', () => clientEngine.start())
