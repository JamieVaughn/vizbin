import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const barData = [
    { key: '0', value: 59 },
    { key: '1', value: 78 },
    { key: '2', value: 49 },
    { key: '3', value: 73 },
    { key: '4', value: 76 },
    { key: '5', value: 71 },
]

function D3HBars({ data = barData, width = 400, height = 25 }) {
    const h = barData.length * height
    const margin = 10
    // d3 scales
    const scaleX = d3
        .scaleLinear()
        .domain([0, d3.max(barData, (d) => d.value)])
        .range([0, width])
    const color = d3
        .scaleSequential(d3.interpolatePlasma) //d3.scaleOrdinal( d3.schemeTableau10 | d3.schemeAccent | d3.schemeBlues[9]) , d3.scaleSequential(d3.interpolatePiYG)
        .domain(barData.map((d) => d.value)) //https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md
    const scaleY = d3
        .scaleBand()
        .domain(data.map((d) => d.key))
        .range([h, 0]) // flipped because Y axis goes from top to bottom
    // d3 margins
    const xMargin = scaleX.copy().range([margin, width - margin])
    const yMargin = scaleY.copy().range([h - margin, margin])
    // create svg from d3 scale output
    const bars = data.map((d, i) => (
        <g
            key={i}
            style={{ transform: `translate(${margin}px, ${yMargin(d.key)}px)` }}
        >
            <rect
                x={margin}
                width={xMargin(d.value) - xMargin(0)}
                height={yMargin.bandwidth()}
                stroke="white"
                fill={color(d.value)}
            />
            <text
                x={xMargin(d.value) - xMargin(0)}
                dx="-20"
                dy="1.2em"
                fill="white"
                fontSize="small"
            >
                {d.value}
            </text>
        </g>
    ))
    const xAxis = d3.axisBottom(xMargin)
    const yAxis = d3.axisLeft(yMargin)

    return (
        <div>
            <h1>Horizontal Bar chart</h1>
            <svg width={width + margin} height={h + margin} style={{ border: '1px dotted grey' }}>
                {bars}
                <g style={{ transform: `translate(${margin}px, ${h - margin}px)` }}
                ref={node => d3.select(node).call(xAxis)}
                />
                <g style={{ transform: `translate(${2*margin}px, 0)` }}
                ref={node => d3.select(node).call(yAxis)}
                />
            </svg>
        </div>
    )
}

function D3VBars({ data = barData, width = 30, height = 200 }) {
    const chart = useRef()

    const w = barData.length * width
    const margin = 20

    // d3 scales
    const scaleX = d3
        .scaleBand()
        .domain(data.map((d) => d.key))
        .range([0, w])
    const color = d3
        .scaleSequential(d3.interpolateRdYlBu) //d3.scaleOrdinal( d3.schemeTableau10 | d3.schemeAccent | d3.schemeBlues[9]) , d3.scaleSequential(d3.interpolatePiYG)
        .domain(barData.map((d) => d.value)) //https://github.com/d3/d3-scale-chromatic/blob/v2.0.0/README.md
    const scaleY = d3
        .scaleLinear()
        .domain([d3.max(data, (d) => d.value), 0])
        .range([0, height]) // flipped because Y axis goes from top to bottom
    // d3 margins
    const xMargin = scaleX.copy().range([w - margin, margin])
    const yMargin = scaleY.copy().range([margin, height - margin])

    // Add axes to the chart in the anti-react, conventional-d3 way
    useEffect(() => {
        const container = d3.select(chart.current)
        container
            .append('g')
            .attr('transform', `translate(0, ${height - margin})`)
            .call(d3.axisBottom(xMargin))

        container
            .append('g')
            .attr('transform', `translate(${margin}, 0)`)
            .call(d3.axisLeft(yMargin))
    }, [])

    // create svg from d3 scale output
    const bars = data.map((d, i) => (
        <g
            key={i}
            style={{ transform: `translate(${xMargin(d.key)}px, ${margin}px)` }}
        >
            <rect
                y={yMargin(d.value) - margin}
                width={xMargin.bandwidth()}
                height={height - yMargin(d.value) - margin}
                stroke="white"
                fill={color(d.value)}
            />
            <text
                y={yMargin(d.value) - margin}
                dx="4"
                dy="-0.25em"
                fill="white"
                stroke="black"
                fontSize="small"
            >
                {d.value}
            </text>
        </g>
    ))

    return (
        <div>
            <h1>Vertical Bar chart</h1>
            <svg width={w} height={height} ref={chart}>
                {bars}
            </svg>
        </div>
    )
}

export { D3HBars, D3VBars }
