import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

import {stream} from '../../public/data/snr_data'

// let max = stream.reduce((acc, cur) => {
//     return cur.snr > acc.snr ? cur : acc
// }, {snr: 0})
// let min = stream.reduce((acc, cur) => cur.snr < acc.snr ? cur : acc, {snr: 0})
// console.log('stream', max, min) // 25.903, -14.9136

const CoursePlot = (props) => {
  const {height, width, scale} = props
  const interval = width/scale
  const canvas = useRef()
  const [cursor, setCursor] = useState(0)
 
  const colorScheme = ['royalblue', 'wheat', 'crimson']
//   const colorScheme = ['royalblue', 'peachpuff', 'crimson']
//   const colorScheme = ['royalblue', 'lemonchiffon', 'crimson']
//   const colorScheme = ['#810081', '#BF4E3D', '#FFA500']

  const interp = d3.piecewise(
    d3.interpolateRgb.gamma(2.2),
    colorScheme
  )

  useEffect(() => {
    const c = canvas.current.getContext('2d')
    clearBricks(c)
    for (let i = 0; i < scale; i++) layBrick(c, i * interval, i/scale) //(stream[i+345].snr+15)/26) // Math.random() > 0.25?i/scale : i/60
    
}, [interval, scale,layBrick])

  function layBrick (ctx, tick, value) {
    ctx.beginPath() // Start a new path
    ctx.moveTo(tick, 10) // Place cursor at beginning (left side)
    ctx.lineWidth = 20
    ctx.strokeStyle = interp(value)
    // console.log('brick', ctx.strokeStyle, tick, value)
    ctx.lineTo(tick+interval -0.5, 10) // Draw a line to next tick scaled to interval
    ctx.stroke()
  }
  function clearBricks(ctx) {
      ctx.beginPath()
      ctx.moveTo(0, 10)
      ctx.strokeStyle = 'linen'
      ctx.lineTo(width, 10)
      ctx.stroke()
  }

  const handleMouseMove = e => {
    // console.log(e.clientX - e.target.offsetLeft)
    // console.dir(e.target)
    setCursor('X: ' + (e.clientX - e.target.offsetLeft))
  }

  return (
        <canvas
          onMouseMove={handleMouseMove}
          ref={canvas}
          width={width}
          height={height}
        />
  )
}

export default function WythePlot(props) {
    const width = 900
    const height = 10
    const scale = 40
    const streams = 20
    const length = streams

    return (
        <>
        <h1>Heatmap</h1>
            <div className="wythe">
                {
                Array.from({length}, (_, index) => ({id: index}))
                    .map(s => (
                    <CoursePlot
                        key={s.id}
                        width={width} 
                        height={height} 
                        scale={scale}
                        />
                ))}
            </div>
        </>
    )
}

