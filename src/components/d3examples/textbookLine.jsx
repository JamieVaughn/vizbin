import React, { useEffect, useState } from 'react'
import { scaleTime, scaleLinear, timeParse, line, select, axisBottom, axisLeft, max, extent } from 'd3'

const margin =  {top: 20, right: 20, bottom: 30, left: 30};
const width = 960 
const mWidth = width - margin.left - margin.right;
const height = 500
const mHeight = height - margin.top - margin.bottom;

var parseTime = timeParse("%d-%b-%y");

const directdata = [
  {date: '26-Mar-12', close: 606.98},
  {date: '27-Mar-12', close: 614.48},
  {date: '28-Mar-12', close: 617.62},
  {date: '29-Mar-12', close: 609.86},
  {date: '30-Mar-12', close: 599.55},
  {date: '2-Apr-12', close: 618.63},
  {date: '3-Apr-12', close: 629.32},
  {date: '4-Apr-12', close: 624.31},
  {date: '5-Apr-12', close: 633.68},
  {date: '9-Apr-12', close: 636.23},
  {date: '10-Apr-12', close: 628.44},
  {date: '11-Apr-12', close: 626.20},
  {date: '12-Apr-12', close: 622.77},
  {date: '13-Apr-12', close: 605.23},
  {date: '16-Apr-12', close: 580.13},
  {date: '17-Apr-12', close: 543.70},
  {date: '18-Apr-12', close: 443.34},
  {date: '19-Apr-12', close: 345.44},
  {date: '20-Apr-12', close: 234.98},
  {date: '23-Apr-12', close: 166.70},
  {date: '24-Apr-12', close: 130.28},
  {date: '25-Apr-12', close: 99.00},
  {date: '26-Apr-12', close: 89.70},
  {date: '27-Apr-12', close: 67.00},
  {date: '30-Apr-12', close: 53.98},
  {date: '1-May-12', close: 58.13}
].map(d => ({date: parseTime(d.date), close: d.close})) // React was substitutig null for the date field when passing the data as props ?? not sure why

const TextbookLine = props => {
  const { data } = props;
  
  const [path, setPath] = useState('')

  const xs = scaleTime().domain(extent( directdata, d => d.date )).range([margin.left, mWidth])
  const xAxis = axisBottom(xs)
  const ys = scaleLinear().domain([0, max(directdata, d => d.close )]).range([mHeight, 0])
  const yAxis = axisLeft(ys)

  const values = line().x(d => xs(d.date)).y(d => ys(d.close))
  
  useEffect(() => {
      setPath(values(directdata))
  }, [])
  return (
    <div id='tips-tricks'>
      <h1>Line Graph from Tips and Tricks Book the React-centric way</h1>
      <svg width={width} height={height}>
        <g style={{transform: `translate(${0}px, ${0}px)`}} >
          <path d={path} className='text-line' />
        </g>
        <g className="text-axisX" ref={node => select(node).call(xAxis)} style={{transform: `translate(0, ${mHeight}px)`}} />
        <g className="text-axisY" ref={node => select(node).call(yAxis)} style={{transform: `translate(${margin.left}px, ${0}px)`}} />
      </svg>
    </div>
  )
}

export default TextbookLine