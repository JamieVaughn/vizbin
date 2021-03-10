import React, { useState } from 'react'
import * as d3 from 'd3'
import {forecast} from '../../data/forecast'

const temperatures = forecast.list.map(d => d.main.temp) || []
const dates = forecast.list.map(d => +new Date(d.dt_txt))

const margin = { top: 0, right: 0, bottom: 30, left: 20 }

const MAX_TEMP = d3.max(temperatures)
const MIN_TEMP = d3.min(temperatures)

const colors = d3
        .scaleLinear()
        .domain([MIN_TEMP, 70, MAX_TEMP])
        .range(['royalblue', 'wheat', 'crimson'])

console.log('d', dates)
    // myChart
    //     .transition()
    //     .attr('height', function (d) {
    //         return yScale(d)
    //     })
    //     .attr('y', function (d) {
    //         return height - yScale(d)
    //     })
    //     .delay(function (d, i) {
    //         return i * 20
    //     })
    //     .duration(1000)
    //     .ease(d3.easeBounceOut)

const initial = {
    hover: null,
    x: 0,
    y: 0,
    content: ''
}

export const Temps = ({height, width}) => {
    const [tooltip, setTooltip] = useState(initial)

    const handleHover = (e, t) => {
        const box = e.target.parentNode.getBoundingClientRect()
        const idx = Number(e.target.dataset.idx)
        setTooltip({
            hover: idx,
            // x: idx < 3 ? - 40 : idx > 32 ? e.clientX - w + 32 : e.clientX - w + 96,
            // x: (w - box.x) + 14*(idx-1) ,
            x: w - box.x/1.5,
            y: h - h/2 + 96,
            content: 'Temp: ' + t + '°F'
        })
    }

    const resetHover = e => {
        setTooltip(initial)
    }

    const h = height - margin.top - margin.bottom
    const w = width - margin.left - margin.right
    
    const yScale = d3.scaleLinear()
        .domain([0, MAX_TEMP])
        .range([0, h])

    const xScale = d3.scaleBand()
        .domain(temperatures)
        .paddingInner(0.1)
        .paddingOuter(0.1)
        .range([0, w])

    const yAxisValues = d3.scaleLinear()
        .domain([0, MAX_TEMP])
        .range([h - margin.bottom, 0])

    const xAxisValues = d3.scaleTime()
        .domain([dates[0], dates[dates.length-1]])
        .range([margin.left, width - 1])
    
    // const xMargin = xAxisValues.copy().range([margin.left, width - 1])
    // const yMargin = yAxisValues.copy().range([h - margin.bottom, 0])
    
    const xAxis = d3.axisBottom(xAxisValues).tickFormat(d3.timeFormat("%b %d, %I:%M%")).ticks(d3.timeDay.every(1))
    const yAxis = d3.axisLeft(yAxisValues).ticks(20)

    return (
        <svg width={w + margin.left} height={h} style={{position: 'relative', marginBottom: '3rem'}}>
            <g width={w - 2 * margin.left} height={h} y={h - yScale(MAX_TEMP)} 
            style={{margin: '2rem', position: 'relative', transform: `translate(0, ${margin.right}px)`}} 
            onMouseOut={resetHover}
            >
                {
                    temperatures.map((t, i) => {
                        return (
                            <rect 
                                key={i}
                                data-idx={i}
                                fill={tooltip.hover === i ? 'gold' : colors(t)} 
                                width={xScale.bandwidth()} 
                                height={yScale(t)- margin.bottom} 
                                x={xScale(t) + margin.left}
                                y={h - yScale(t)}
                                onMouseOver={(e) => handleHover(e, t)}
                            />
                        )
                    })
                }
            </g>
            <g 
            className='xAxis'
            style={{transform: `translate(0, ${h - margin.bottom}px)`}}
            ref={(node) => d3.select(node).call(xAxis)}
            />
            <g 
            className='yAxis'
            style={{transform: `translate(${margin.left}px, 0)`}}
            ref={(node) => d3.select(node).call(yAxis)}
            />
            <g className='tooltip'
            style={{transform: `translate(${tooltip.x}px, ${tooltip.y - 48}px, 1px)`}}>
                <text fill='black'>{tooltip.content}</text>
            </g>
        </svg>
    )
}
