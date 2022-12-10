import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'

export interface PixiObjectInfo {
  type: string
  [key: string]: any
}

export interface SpriteWithInfo extends Sprite {
  info?: PixiObjectInfo
}

// The PIXI Application should only be created in the browser and not during server-side-rendering.
let _app : Application | null = null

export function createApp( resizeTo: HTMLElement | null  ) {
  if (!_app) {
    _app = new Application({
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      resizeTo: resizeTo || undefined,
    })
    window.pixiApp = _app // to give cypress access to the app
  }
  return _app.view
}

declare global {
  interface Window {
    pixiApp?: Application
  }
}

export function drawGhosty() {
  if (!_app) {
    throw new Error('App not created')
  }
  const ghosty : SpriteWithInfo = Sprite.from('assets/ghosty_left.png')
  ghosty.info = { type: 'ghosty' }
  ghosty.x = _app.screen.width / 2
  ghosty.y = _app.screen.height / 2
  ghosty.anchor.set(0.5)
  _app.stage.addChild(ghosty)
}
