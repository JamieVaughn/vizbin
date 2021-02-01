import {useState} from 'react'
import useEventListener from './useEventListener'
import useMousePosition from './useMousePosition'

const MIN_SCALE = 0.2
const MAX_SCALE = 5
/**
 * Listen for `wheel` events on the given element ref and update the reported
 * scale state, accordingly.
 */
const reducer = {
    up: (prev, next) => Math.min(prev+next, MAX_SCALE),
    down: (prev, next) => Math.max(prev-next, MIN_SCALE)
}

export default function useScale(ref) {
  const [scale, setScale] = useState(1)
  const mousePos = useMousePosition(ref.current)
  const updateScale = ({direction, delta}) => {
    // Adjust up to or down to the maximum or minimum scale levels by `delta`.
    setScale(prevScale => reducer[direction](prevScale, delta) ?? prevScale)
  }
  // Set up an event listener such that on `wheel`, we call `updateScale`.
  useEventListener(
    'wheel',
    e => {
      e.preventDefault()
      let dial = !e.ctrlKey ? 0.1 : 0.1*scale
      updateScale({
        direction: e.deltaY > 0 ? 'up' : 'down',
        delta: dial
      })
    },
    ref.current,
    {passive: false}
  )
  return [scale, mousePos]
}