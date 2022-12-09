import { useEffect, useRef } from 'react'
import { createApp } from '~/game/app'

export const View = () => {
  
  const wrapperDiv = useRef<HTMLDivElement>(null);
  // useEffect only runs in the browser, not on server-side-rendering.
  useEffect(() => {
    // @ts-ignore
    wrapperDiv.current?.appendChild(createApp())
  }, []);

  return (
    <>
      <div ref={wrapperDiv}></div>
    </>
  )
}
