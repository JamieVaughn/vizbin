import React, {useCallback, useRef, useState} from 'react'
import { zoom, zoomIdentity, select, range } from 'd3'




export default function GeometricZoom({w, h}) {
  const rounded = useRef({})
  const vlineSpacing = range(0,w+1,20)
  const hlineSpacing = range(0,h+1,20)
  const [zoomState, setZoomState] = useState(zoomIdentity)


  const zoomUpdater = useCallback(transform => {
    rounded.current.x = Math.round(transform.x),
    rounded.current.y = Math.round(transform.y),
    rounded.current.k = Number(transform.k.toFixed(2))
    setZoomState(rounded.current)
  })

  const zoomListener = zoom().scaleExtent([0.1,10]).on('zoom', ({transform}) => zoomUpdater(transform))

    return (
        <div>
          <h1>Geo Zoom</h1>
            <div className="intgraph">
              <svg className='geozoom' width={w} height={h}>
                <g className='graph'>
                  <rect width={w} height={h} 
                    style={{pointerEvents: 'all'}}
                    ref={node => select(node).call(zoomListener)}
                  />
                  <g className='plotting-area'
                    style={{
                      transform: `translate(${zoomState.x}px, ${zoomState.y}px) scale(${zoomState.k})`}}
                  >
                      {vlineSpacing.map((l, i) => <line key={i} className='vertical grid' x1={l} x2={l} y1={0} y2={h} />)}
                      {hlineSpacing.map((l, i) => <line key={i} className='horizontal grid' x1={0} x2={w} y1={l} y2={l} />)}
                  </g>
                </g>
              </svg>
            </div>
            <div className='label'>Offest: {zoomState.x}, {zoomState.y}</div>
            <div className='label'>Scale: {zoomState.k}</div>
        </div>
    )
}