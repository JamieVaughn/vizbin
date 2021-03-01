import React from 'react'
import './App.css'
import * as d3 from 'd3'

function BarChart(props) {
    const { data, size, onHover, hoverElement, colorScale } = props

    const barWidth = size[0] / data.length
    const dataMax = data.reduce((a, c, i) => Math.max(a, c.data[i] ?? 0), 0)
    const yScale = d3.scaleLinear().domain([0, dataMax]).range([0, size[1]])

    const legendColors = [
        'rgb(117,115,159)',
        'rgb(94,175,198)',
        'rgb(65,163,104)',
        'rgb(147,196,100)',
    ]
    const legendEl = (
        <g className="legend" transform={`translate(${size[0]}, 50)`}>
            <g className="legendCells">
                {['Wave 1', 'Wave 2', 'Wave 3', 'Wave 4'].map((text, i) => (
                    <g
                        key={i}
                        className="cell"
                        transform={`translate(0, ${i * 20})`}
                    >
                        <rect
                            className="swatch"
                            height="15"
                            width="15"
                            fill={legendColors[i]}
                        />
                        <text
                            className="label"
                            transform={`translate(25, 12.5)`}
                        >
                            {text}
                        </text>
                    </g>
                ))}
            </g>
        </g>
    )

    const bars = data.map((d, i) => {
        return (
            <rect
                key={i}
                className="bar"
                onMouseOver={onHover}
                x={i * barWidth}
                y={size[1] - yScale(d.data[i] ?? 0)}
                height={yScale(d.data[i] ?? 0)}
                width={barWidth}
                fill={
                    hoverElement === d.id ? '#FCBC34' : colorScale(d.launchday)
                }
                stroke="black"
                strokeOpacity="0.25"
            />
        )
    })

    return (
        <svg width={size[0] + 100} height={size[1] * 2}>
            <g>{bars}</g>
            {legendEl}
        </svg>
    )
}

export default BarChart
