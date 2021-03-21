import React from 'react'
import { select, axisLeft, axisRight, axisBottom, axisTop } from 'd3'

const axisMap = {
  bottom: axisBottom,
  left: axisLeft,
  right: axisRight,
  top: axisTop
}

export default function AxisAny(props) {
  const { axis, scale, shift } = props
  let side = props.side ?? ['bottom', 'left'][+!shift.x]
  const axisOption = axis ?? axisMap[side](scale)
  return (
    <g 
    style={{...props.style, transform: `translate(${shift.x}px, ${shift.y}px)`}}
    ref={node => select(node).call(axisOption)}
    />
  )
}