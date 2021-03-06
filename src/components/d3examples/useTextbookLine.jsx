import React, { useEffect, useState, useRef} from 'react'
import * as d3 from 'd3'
var parseTime = d3.timeParse("%d-%b-%y");

const tdata = [
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
].map(d => ({date: parseTime(d.date), close: d.close}))

export default function UseTextbookLine ({data}) {
      // set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 70},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
  const container = useRef(null)
// var parseTime = d3.timeParse("%d-%b-%y");

  // const [tdata, setTdata] = useState(data.map(d => ({date: parseTime(d.date), close: d.close})))
  useEffect(() => {
    if(!container.current) return () => null


// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.close); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(container.current).append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");



// Scale the range of the data
x.domain(d3.extent(tdata, function(d) { return d.date; }));
y.domain([0, d3.max(tdata, function(d) { return d.close; })]);

// Add the valueline path.
svg.append("path")
  .data([tdata])
  .attr("class", "line")
  .attr('stroke-dasharray', '3, 3, 10, 10') // this means 3 pixels on, 3 pixels off, 10 pixels on, 10 pixels off, repeat (any even length list is ok)
  .attr("d", valueline)
  .attr("stroke", 'steelblue')
  .attr("fill", 'none');

// Add the x Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add the y Axis
svg.append("g")
  .call(d3.axisLeft(y));

  }, [tdata])

  return (
    <>
    <h1>Textbook line Graph the d3-centric way</h1>
      <div ref={container} />
    </>
  )
}