import React, { useEffect, useState } from 'react'
import { axisBottom, axisLeft, line, curveCardinal, scaleLinear, select } from 'd3'

import AxisAny from '../AxisAny'

const OneLine = props => {
    const {h, w, m} = props.dimensions
    const {rawdata} = props

    const [data, setData] = useState(rawdata)
    const [toggleFill, setToggleFill] = useState('none')
    // const [lines, setLines] = useState({new: '', old: ''})
    const [line1, setLine] = useState('')

    const xScale = scaleLinear().domain([0, data.length - 1]).range([m, w-m])
    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(i => i+1)
    const yScale = scaleLinear().domain([0, Math.max(...data)]).range([h-m, m])
    const yAxis = axisLeft(yScale)

    const sparkline = line().x((_, i) => xScale(i)).y(yScale).curve(curveCardinal)
    const handleRange = (e, i) => {
        setData(data.map((d,id) => id === i ? +e.target.value : d))
    }
    const handleClick = () => {
        setToggleFill(toggleFill == 'none' ? 'orange' : 'none')
    }

    useEffect(() => {
        const path = sparkline(data)
        // setLines(state => ({old: state.new, new: path}))
        setLine(path)
    }, [data])
    
    const sliders = data.map((d, i) => <input key={i} value={d} type='range' min='0' max={h} step='1' onChange={e => handleRange(e, i)} />)

    return (
        <>
            <h4>Simple Line <button onClick={handleClick}>toggle fill</button></h4>
            <div className='one-line'>
                <svg height={h+m} width={w+m} > 
                    <path d={line1} fill={toggleFill} stroke='crimson' strokeWidth='3'>
                        {/* <animate id='path' attributeName='d' dur='0.25s' fill='freeze' from={lines.old} to={lines.new} /> */}
                    </path>
                    <AxisAny axis={xAxis} shift={{x: 0, y: h-m}} />
                    <AxisAny axis={yAxis} shift={{x: m, y: 0}} />
                    {/* <g className='x-axis' style={{transform: `translate(${0}px, ${h-m}px)`}} ref={node => select(node).call(xAxis)}/> */}
                    {/* <g className='y-axis' style={{transform: `translate(${m}px, 0)`}} ref={node => select(node).call(yAxis)}/> */}
                </svg>
                <div className='range-container'>
                    {sliders}
                </div>
            </div>
        </>
    )
}

export default OneLine