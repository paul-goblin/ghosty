import { useEffect, useRef } from 'react'
import { createApp, drawGhosty } from '~/game/app'

export const View = () => {
  
  const wrapperDiv = useRef<HTMLDivElement>(null);
  // useEffect only runs in the browser, not on server-side-rendering.
  useEffect(() => {
    const view = createApp(wrapperDiv.current);
    //@ts-ignore
    wrapperDiv.current?.appendChild(view)
    drawGhosty()
  }, []);

  return (
    <>
      <div
        ref={wrapperDiv}
        className='h-screen'
      ></div>
    </>
  )
}
