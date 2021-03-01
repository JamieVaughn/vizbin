import React from 'react'
import './App.css'
import * as d3 from 'd3'

function StreamGraph(props) {
    const { data, size, onHover, hoverElement, colorScale } = props
    const stackData = Array(30)
        .fill(1)
        .map((_, i) => ({}))
    const stackData1 = data.map((d, i) => ({ [d.id]: d.data[i] }))

    for (let x = 0; x < 30; x++) {
        data.forEach((country) => {
            stackData[x][country.id] = country.data[x]
        })
    }

    const xScale = d3.scaleLinear().domain([0, 30]).range([0, size[0]])

    const yScale = d3.scaleLinear().domain([0, 60]).range([size[1], 0])

    const stackLayout = d3
        .stack()
        .offset(d3.stackOffsetWiggle)
        .order(d3.stackOrderInsideOut)
        .keys(Object.keys(stackData[0]))

    const stackArea = d3
        .area()
        .x((d, i) => xScale(i))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]))
        .curve(d3.curveBasis)

    const stacks = stackLayout(stackData).map((d, i) => (
        <path
            key={'stack' + i}
            d={stackArea(d)}
            onMouseEnter={() => {
                onHover(data[i])
            }}
            style={{
                fill:
                    hoverElement === data[i]['id']
                        ? '#FCBC34'
                        : colorScale(data[i].launchday),
                stroke: 'black',
                strokeOpacity: 0.5,
            }}
        />
    ))

    return (
        <svg
            width={size[0]}
            height={size[1]}
            onClick={() =>
                console.log('0', data, '1', stackData, '2', stackData1)
            }
        >
            <g transform={'translate(0,' + -size[1] / 2 + ')'}>{stacks}</g>
        </svg>
    )
}

export default StreamGraph
