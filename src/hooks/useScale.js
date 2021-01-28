import {useState} from 'react'
import useEventListener from './useEventListener'

const MIN_SCALE = 0.5
const MAX_SCALE = 3
/**
 * Listen for `wheel` events on the given element ref and update the reported
 * scale state, accordingly.
 */
export default function useScale(ref) {
  const [scale, setScale] = useState(1)
  const updateScale = ({direction, interval}) => {
    setScale(currentScale => {
      let scale
      // Adjust up to or down to the maximum or minimum scale levels by `interval`.
      if (direction === 'up' && currentScale + interval < MAX_SCALE) {
        scale = currentScale + interval
      } else if (direction === 'up') {
        scale = MAX_SCALE
      } else if (direction === 'down' && currentScale - interval > MIN_SCALE) {
        scale = currentScale - interval
      } else if (direction === 'down') {
        scale = MIN_SCALE
      } else {
        scale = currentScale
      }
      return scale
    })
  }
  // Set up an event listener such that on `wheel`, we call `updateScale`.
  useEventListener(
    'wheel',
    e => {
      e.preventDefault()
      updateScale({
        direction: e.deltaY > 0 ? 'up' : 'down',
        interval: 0.1
      })
    },
    ref.current,
    {passive: false}
  )
  return scale
}