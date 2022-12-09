import { Application } from '@pixi/app'


// The PIXI Application should only be created in the browser and during server-side-rendering.
let _app : Application | null = null

export function createApp() {
  if (!_app) {
    _app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    })
  }
  return _app.view
}