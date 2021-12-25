import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'


export default function SimpleLine({ data /* see data tab */ }) {
    const defaultData = [{name: 'a', value: 1}, {name: 'b', value: 3}, {name: 'c', value: 2}, {name: 'd', value: 5}, {name: '3', value: 8}]
    const points = data ?? defaultData
    const dims = {w: 500, h: 150, p: 20, m: 20, max: 20}
    const svgRef = useRef(null)
    const [chartData, setChartData] = useState(points)
    // const [line, setLine] = useState('')
    const newData = () => {
      return points.map(item => ({...item, value: Math.floor((Math.random()*dims.max)) }))
    }

    useEffect(() => {
    //setup scales
      const xScale = d3.scalePoint()
                      .domain(chartData.map(d => d.name))
                      .range([(0+dims.p), (dims.w-dims.p)])
      const yScale = d3.scaleLinear()
                      .domain([0,d3.max(chartData, d => d.value)])
                      .range([(dims.h - dims.p), (0 + dims.p)])
      console.log('x', xScale('a'), xScale('d'), 'y', yScale(0), yScale(100))
    // setup fns to draw lines

      const path = d3.line()
                    .x(d => xScale(d.name))
                    .y((d => yScale(d.value)))
                    .curve(d3.curveMonotoneX)
      // setLine(path)
    // draw line
      d3.select(svgRef.current).select('path').attr('d', () => path(chartData)).attr('fill', 'none').attr('stroke', 'dodgerblue').attr('strokeWidth', '3')
    // setup fns to draw x & y axes
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)
    // draw axes
      d3.select('#xaxis').remove()
      d3.select(svgRef.current)
        .append('g')
        .attr('transform', `translate(0, ${dims.h-dims.p})`)
        .attr('id', 'xaxis')
        .call(xAxis)
      d3.select('#yaxis').remove()
      d3.select(svgRef.current)
        .append('g')
        .attr('transform', `translate(${dims.p}, 0)`)
        .attr('id', 'yaxis')
        .call(yAxis)
    }, [chartData])
    
    return (
        <div style={{ height: '500px' }}>
          <svg id='chart' viewBox='0 0 500 150' ref={svgRef}>
            <rect width='500' height='150' fill='none' stroke='black' />
            <path d='' fill='none' stroke='dodgerblue' strokeWidth='3' />
          </svg>
          <p>
            <button onClick={() => setChartData(newData())}>Change Data</button>
          </p>
        </div>
    )
}
