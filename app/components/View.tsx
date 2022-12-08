import { useEffect, useRef, useState } from 'react'
import { Application } from '@pixi/app'

// The PIXI Application should only be created in the browser and not on the server.
let _app : Application | null = null

function createApp() {
  if (!_app) {
    _app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    })
  }
}

export const View = () => {
  
  const wrapperDiv = useRef<HTMLDivElement>(null);
  // useEffect only runs in the browser, not on server-side-rendering.
  useEffect(() => {
    createApp()
    wrapperDiv.current?.appendChild(_app.view)
  }, []);

  return (
    <>
      <div ref={wrapperDiv}></div>
    </>
  )
}
