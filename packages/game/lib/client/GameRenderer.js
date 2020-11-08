// Module imports
import { Renderer } from 'lance-gg'
import * as Pixi from 'pixi.js'





// Local imports
import { Character } from 'common/Character'
import {
	CHARACTER_HEIGHT,
	CHARACTER_WIDTH,
	WALK_SPEED,
} from 'common/data'





export class GameRenderer extends Renderer {
	/****************************************************************************\
		Class Properties
	\****************************************************************************/

	isReady = false

	sprites = {}





	/****************************************************************************\
		Public Methods
	\****************************************************************************/

	constructor(gameEngine, clientEngine) {
		super(gameEngine, clientEngine)

		this.assetPaths = {
			mage: '/images/characters/mage/mage-spritesheet.json',
		}

		this.canvasElement = document.querySelector('canvas')
	}

	draw(t, dt) {
		super.draw(t, dt)

		const { loader } = this.renderer
		const characters = this.gameEngine.world.queryObjects({ instanceType: Character })

		characters.forEach(character => {
			const {
				animationName,
				id,
				position,
				profession,
			} = character

			const sprite = this.sprites[id]

			if (sprite) {
				const assetPath = this.assetPaths[profession]
				const { spritesheet } = loader.resources[assetPath]
				const animation = spritesheet.animations[animationName]

				const animationHasChanged =
					(animation.length !== sprite.textures.length) ||
					!animation.every((frame, index) => {
						return frame === sprite.textures[index]
					})

				if (animationHasChanged) {
					sprite.textures = spritesheet.animations[animationName]
				}

				if (!sprite.playing) {
					sprite.play()
				}

				sprite.position.set(position.x, position.y)
			}
		})

		this.renderer.render(this.renderer.stage)
	}

	async init() {
		// Start loading the game assets once the DOM is ready
		await new Promise(resolve => {
			const handleDOMContentLoaded = () => {
				window.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
				resolve()
			}
			window.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
		})

		// Set the scale mode for pixelated textures
		Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST
		Pixi.settings.RESOLUTION = window.devicePixelRatio

		// Create the Pixi application
		this.renderer = new Pixi.Application({
			autoStart: false,
			height: document.body.clientHeight,
			resizeTo: document.body,
			view: this.canvasElement,
			width: document.body.clientWidth,
		})

		// Load assets
		await this.loadAssets()

		const { loader } = this.renderer

		this.gameEngine.on('objectAdded', object => {
			if (object instanceof Character) {
				const {
					animationName,
					id,
					profession,
				} = object

				const assetPath = this.assetPaths[profession]
				const { spritesheet } = loader.resources[assetPath]

				const sprite = new Pixi.AnimatedSprite(spritesheet.animations[animationName])
				sprite.anchor.set(0.5, 0.5)
				sprite.scale.set(4, 4)
				sprite.animationSpeed = 0.1

				// Store the sprite
				this.sprites[id] = sprite

				// Render the sprite
				this.renderer.stage.addChild(sprite)
			}
		})

		this.gameEngine.on('objectDestroyed', object => {
			this.sprites[object.id].destroy()
			delete this.sprites[object.id]
		})

		this.gameEngine.emit('renderer.ready')
	}

	async loadAssets() {
		const { loader } = this.renderer

		loader.add(Object.values(this.assetPaths))

		await new Promise(resolve => loader.load(resolve))

		// Process `frameTags` into animations
		Object.entries(loader.resources).forEach(([assetPath, resource]) => {
			if (!assetPath.endsWith('.json')) {
				return
			}

			const spritesheet = resource.spritesheet
			spritesheet.data.animations = {}
			spritesheet.data.meta.frameTags.forEach(frameTag => {
				const {
					from,
					name,
					to,
				} = frameTag

				spritesheet.data.animations[name] = Object.keys(spritesheet.data.frames).slice(from, to + 1)
			})
			spritesheet._processAnimations()
		})
	}
}
