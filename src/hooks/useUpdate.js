import { useEffect, useRef } from 'react'

export default function useUpdate(callback, dependencies) {
  const firstRenderRef = useRef(true)
  useEffect(() => {
    return firstRenderRef.current ? firstRenderRef.current = false : callback()
  }, dependencies)
}

// use it like:
// useUpdate(() => alert(count), [count])
