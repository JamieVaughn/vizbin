import React, { useEffect, useState } from 'react'
import { area, curveBasis, curveStep, scaleTime, scaleLinear, timeDay, timeFormat, timeParse, line, select, axisBottom, axisLeft, axisRight, max, extent, curveBundle } from 'd3'

const margin =  {top: 80, right: 40, bottom: 30, left: 70};
const width = 560 
const mWidth = width - margin.left - margin.right;
const height = 300
const mHeight = height - margin.top - margin.bottom;

var parseTime = timeParse("%d-%b-%y");

const directdata = [
  {date: '1-May-12', close: 68.13, open: 34.12},
  {date: '30-Apr-12', close: 63.98, open: 45.56},
  {date: '27-Apr-12', close: 67.00, open: 67.89},
  {date: '26-Apr-12', close: 89.70, open: 78.54},
  {date: '25-Apr-12', close: 99.00, open: 89.23},
  {date: '24-Apr-12', close: 130.28, open: 99.23},
  {date: '23-Apr-12', close: 166.70, open: 101.34},
  {date: '20-Apr-12', close: 234.98, open: 122.34},
  {date: '19-Apr-12', close: 345.44, open: 134.56},
  {date: '18-Apr-12', close: 443.34, open: 160.45},
  {date: '17-Apr-12', close: 543.70, open: 180.34},
  {date: '16-Apr-12', close: 580.13, open: 210.23},
  {date: '13-Apr-12', close: 605.23, open: 223.45},
  {date: '12-Apr-12', close: 622.77, open: 201.56},
  {date: '11-Apr-12', close: 626.20, open: 212.67},
  {date: '10-Apr-12', close: 628.44, open: 310.45},
  {date: '9-Apr-12', close: 636.23, open: 350.45},
  {date: '5-Apr-12', close: 633.68, open: 410.23},
  {date: '4-Apr-12', close: 624.31, open: 430.56},
  {date: '3-Apr-12', close: 629.32, open: 460.34},
  {date: '2-Apr-12', close: 618.63, open: 510.34},
  {date: '30-Mar-12', close: 599.55, open: 534.23},
  {date: '29-Mar-12', close: 609.86, open: 578.23},
  {date: '28-Mar-12', close: 617.62, open: 590.12},
  {date: '27-Mar-12', close: 614.48, open: 560.34},
  {date: '26-Mar-12', close: 606.98, open: 580.12}
].map(d => ({date: parseTime(d.date), close: +d.close, open: +d.open/10}))

const DualAxes = props => {
  
  const [path, setPath] = useState('')
  const [path2, setPath2] = useState('')

  const xs = scaleTime().domain(extent( directdata, d => d.date )).range([margin.left, mWidth])
  // const xAxis = axisBottom(xs).ticks(7)
  const xAxis = axisBottom(xs).ticks(timeDay.every(4)).tickFormat(timeFormat("%y-%b-%d"))
  const y0 = scaleLinear()
              .domain([0, max(directdata, d => Math.max(d.close, d.open) )]) // Math.max here lets us keep the y axis sized to the biggest range of possible data with multiple lines. It isn't needed for one line charts.
              .range([mHeight, 0])
  const y0Axis = axisLeft(y0)

  const y1 = scaleLinear()
              .domain([0, max(directdata, d => Math.max(d.close, d.open) )]) // Math.max here lets us keep the y axis sized to the biggest range of possible data with multiple lines. It isn't needed for one line charts.
              .range([mHeight, 0])
  const y1Axis = axisRight(y1)

  // const values = line().curve(curveBasis).x(d => xs(d.date)).y(d => ys(d.close))
  const values = line().curve(curveBundle.beta(1)).x(d => xs(d.date)).y(d => y0(d.close)) // uses y0 scale
  const values2 = line().curve(curveBasis).x(d => xs(d.date)).y(d => y1(d.open)) // uses y1 scale

  useEffect(() => {
      setPath(values(directdata))
      setPath2(values2(directdata))
  }, [])


  return (
    <div id='tips-tricks'>
      <h1>Dual Axes Line Graph from Tips and Tricks Book the React-centric way</h1>
      <svg width={width} height={height+margin.top}>

        <g className='chart' style={{transform: `translate(${0}px, ${margin.top}px)`}} >
          <path d={path} className='text-line' />
          <path d={path2} className='text-line two' style={{stroke: 'crimson'}} />
        </g>
        
        <g className="text-axisX axis rotate-ticks" ref={node => select(node).call(xAxis)} style={{transform: `translate(0, ${mHeight + margin.top}px)`}} />
        <g className="text-axisY axisLeft" ref={node => select(node).call(y0Axis)} style={{transform: `translate(${margin.left}px, ${margin.top}px)`}}></g>
        <g className="text-axisY axisRight" ref={node => select(node).call(y1Axis)} style={{transform: `translate(${mWidth}px, ${margin.top}px)`}}></g>
        <text x={width/2} y={height + margin.bottom} style={{textAnchor: 'middle'}}>Date</text>
        <text x={-height/2 - margin.bottom} y={margin.left} dy='-1.5em' style={{textAnchor: 'middle', transform: `rotate(-90deg)`}}>Price</text>
        <text x={width/2} y={margin.bottom} style={{textAnchor: 'middle'}}>Price over time</text>
        
      </svg>
    </div>
  )
}

export default DualAxes