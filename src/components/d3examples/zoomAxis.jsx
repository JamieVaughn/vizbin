import React, {useEffect} from 'react'
import { select, scaleBand, axisTop, axisBottom, zoom } from 'd3'

data = [
  {name: "E", value: 0.12702},
  {name: "T", value: 0.09056},
  {name: "A", value: 0.08167},
  {name: "O", value: 0.07507},
  {name: "I", value: 0.06966},
  {name: "N", value: 0.06749},
  {name: "S", value: 0.06327},
  {name: "H", value: 0.06094},
  {name: "R", value: 0.05987},
  {name: "D", value: 0.04253},
   {name: "L", value: 0.04025},
  {name: "C", value: 0.02782},
  {name: "U", value: 0.02758},
  {name: "M", value: 0.02406},
  {name: "W", value: 0.0236},
  {name: "F", value: 0.02288},
  {name: "G", value: 0.02015},
  {name: "Y", value: 0.01974},
  {name: "P", value: 0.01929},
  {name: "B", value: 0.01492},
]

export default function AxisAny(props) {
  const height = 500
  const width = 500
  const margin = {top: 20, right: 0, bottom: 30, left: 40}
  const x = scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x).tickSizeOuter(0))
    const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
  useEffect(() => {
  x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));

  }, [])
  const zoomFn = () => {

  }
  return (
    <svg ref={node => select(node).call(() => zoom()
      .scaleExtent([1, 8])
      .translateExtent(extent)
      .extent(extent)
      .on("zoom", zoomed))}>
      <g 
      style={{...props.style, transform: `translate(${margin.right}px, ${margin.top}px)`}}
      ref={node => select(node).call(xAxis)}
      />
    </svg>
  )
}

function zoomed(event) {
  x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
  svg.selectAll(".bars rect").attr("x", d => x(d.name)).attr("width", x.bandwidth());
  svg.selectAll(".x-axis").call(xAxis);
}

function zoomFnd(svg) {
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

  svg.call(zoom()
      .scaleExtent([1, 8])
      .translateExtent(extent)
      .extent(extent)
      .on("zoom", zoomed));

}
