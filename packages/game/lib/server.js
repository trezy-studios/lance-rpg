// Module imports
import { createServer } from 'http'
import socketIO from 'socket.io'
import Koa from 'koa'
import Router from '@koa/router'





// Local imports
import { defaultOptions } from 'common/defaultOptions'
import { Game } from 'common/Game'
import { GameServerEngine } from 'server/GameServerEngine'





// Local constants
const {
	NODE_ENV,
	PORT = 3001,
} = process.env
const isDev = process.env.NODE_ENV !== 'production'





;(async function init() {
	const koaApp = new Koa
	const router = new Router

	koaApp.use(async (context, next) => {
    context.res.statusCode = 200
    await next()
	})
	koaApp.use(router.routes())
  koaApp.use(router.allowedMethods())

	const server = createServer(koaApp.callback())
	const io = new socketIO(server, {})

	const gameEngine = new Game(defaultOptions)
	const serverEngine = new GameServerEngine(io, gameEngine, defaultOptions)

	serverEngine.start()

	server.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`))
})()
