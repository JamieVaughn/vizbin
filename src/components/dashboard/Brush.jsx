import React, { useEffect, useRef } from 'react'
import './App.css'
import * as d3 from 'd3'

function Brush (props) {
  const { size, changeBrush } = props
  const node = useRef()
  

  const createBrush = () => {
    const scale = d3.scaleLinear().domain([0,36])
      .range([0, size[0]])

    const dayBrush = d3.brushX()
      .extent([[0, 0], size])
      .on("brush", brushed)

    const dayAxis = d3.axisBottom()
      .scale(scale)

    d3.select(node.current)
      .selectAll("g.brushaxis")
      .data([0])
      .enter()
      .append("g")
        .attr("class", "brushaxis")
        .attr("transform", "translate(0,25)")

    d3.select(node.current)
      .select("g.brushaxis")
        .call(dayAxis)

    d3.select(node.current)
      .selectAll("g.brush")
      .data([0])
      .enter()
      .append("g")
        .attr("class", "brush")
        .attr("transform", "translate(0,0)")

    d3.select(node.current)
      .select("g.brush")
      .call(dayBrush)

    d3.select(node.current)
      .select("g.brush")
      .selectAll("g.resize")
      .selectAll("circle")
      .data([0])
      .enter()
      .append("circle")
        .attr("r", 25)
        .attr("cy",25)
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "4px")
        .style("opacity", .75);

    const brushFn = changeBrush
    function brushed(e) {
      const selectedExtent = e.selection.map(d => scale.invert(d))
      brushFn(selectedExtent)
    }

  }

  useEffect(() => {
    if(node.current) createBrush()
  },[])

    return <svg ref={node} width={size[0]} height={50}></svg>
}

export default Brush
