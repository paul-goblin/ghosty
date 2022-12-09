import { useEffect, useRef } from 'react'
import { createApp, drawGhosty } from '~/game/app'

export const View = () => {
  
  const wrapperDiv = useRef<HTMLDivElement>(null);
  // useEffect only runs in the browser, not on server-side-rendering.
  useEffect(() => {
    // @ts-ignore
    wrapperDiv.current?.appendChild(createApp())
    drawGhosty()
  }, []);

  return (
    <>
      <div ref={wrapperDiv}></div>
    </>
  )
}
