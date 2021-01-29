import React, { useLayoutEffect, useEffect, useState, useRef }from 'react'
import usePan from '../hooks/usePan'
import useScale from '../hooks/useScale'
import styled from 'styled-components'
import useEventListener from '../hooks/useEventListener'

const Hud = styled.span`
    z-index: 99;
`

const styles = {
    position: 'relative',
    margin: '1rem auto', 
    background: 'black', 
    color: 'white',
    width: '700px', 
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'flex-end',
    userSelect: 'none',
    overflow: 'hidden',
    padding: '4px',
}
const cursor = {
    cursor: 'all-scroll'
}
const ptOps = {
    '+': (p1, p2) => ({x: p1.x + p2.x, y: p1.y + p2.y}),
    '-': (p1, p2) => ({x: p1.x - p2.x, y: p1.y - p2.y}),
    'x': (p1, p2) => ({x: p1.x * p2.x, y: p1.y * p2.y}),
    '*': (p1, p2) => ({x: p1.x * p2.x, y: p1.y * p2.y}),
    '/': (p1, p2) => ({x: p1.x / p2.x, y: p1.y / p2.y}),
    '==': (p1, p2) => p1.x === p2.x && p1.y === p2.y ? true : false,
    'scale': (p1, factor) => ({x: p1.x / factor, y: p1.y / factor}),
    'translate': (p1, factor) => ({x: p1.x + factor, y: p1.y + factor}),
}
const infixPts = (p1, operator, p2) => ptOps[operator](p1, p2)

export const ZoomPan = () => {
    const ref = useRef(null)
    const [inset, setInset] = useState({x: 0, y: 0})
    const [offset, startPan, deltas] = usePan()
    const [scale, mousePos] = useScale(ref)
    const [adjust, setAdjust] = useState({x: 0, y: 0})
    const [hasPan, setHasPan] = useState(false)
    useLayoutEffect(() => {
        const height = ref.current?.clientHeight ?? 0
        const width = ref.current?.clientWidth ?? 0
        const marginTop = ref.current.offsetTop
        const marginLeft = ref.current.offsetLeft
        const focal = infixPts(mousePos, '-', {x: marginLeft, y: marginTop})
        const scaleFocal = infixPts(focal, 'scale', scale)
        setAdjust(infixPts(scaleFocal, '-', offset))

        setInset({
          x: (width - width / scale) / 2,
          y: (height - height / scale) / 2
        })
      }, [scale, setInset])

    useEventListener('mousedown', () => setHasPan(true), ref.current)
    useEventListener('mouseup', () => setHasPan(false), ref.current)

    return (
      <div onMouseDown={startPan} style={{...styles, ...cursor}} ref={ref}>
        <div style={{
            position: 'absolute',
            transition: `transform .25s${hasPan ? '' : ', background-position .25s'}`,
            inset: `${inset.y}px ${inset.x}px`, // shorthand for top, bottom, left, right
            backgroundImage: 'url("/grid.svg")', 
            transform: `scale(${scale})`, 
            backgroundPosition: `${-adjust.x-offset.x}px ${-adjust.y-offset.y}px`,
            }}></div>
        <Hud>Scale: {scale.toFixed(1)}</Hud>
        <Hud>Offset: {`{x: ${offset.x}, y: ${offset.y}}`} {`{x: ${deltas.x}, y: ${deltas.y}}`}</Hud>
        <Hud>Adjustment: {`{x: ${adjust.x.toFixed(0)}, y: ${adjust.y.toFixed(0)}}`}</Hud>
        <Hud>Inset: {`{x: ${inset.x.toFixed(0)}, y: ${inset.y.toFixed(0)}}`}</Hud>
      </div>
    )
  }