import React, { useRef }from 'react'
import usePan from '../hooks/usePan'
import useScale from '../hooks/useScale'

const styles = {
    margin: '1rem auto', 
    background: 'white', 
    color: 'gray',
    width: '400px', 
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-around',
    userSelect: 'none',
    overflow: 'hidden'
}
const cursor = {
    cursor: 'all-scroll'
}

export const ZoomPan = () => {
    const ref = useRef(null)
    const [offset, startPan] = usePan()
    const scale = useScale(ref)
    return (
      <div onMouseDown={startPan} style={{...styles, ...cursor}} ref={ref}>
        <div style={{
            width: "100%",
            height: "100%",
            backgroundImage: 'url("/grid.svg")', 
            transform: `scale(${scale})`, 
            backgroundPosition: `${-offset.x}px ${-offset.y}px`
            }}></div>
        <span>Offset: {JSON.stringify(offset)}</span>
        <span>Scale: {scale.toFixed(1)}</span>
      </div>
    )
  }