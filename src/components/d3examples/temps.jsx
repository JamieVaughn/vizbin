import React, { useEffect, useState, useRef } from 'react'
import * as d3 from 'd3'
import {forecast} from '../../data/forecast'
import { Treemap } from 'recharts'

const temperatures = forecast.list.map(d => d.main.temp) || []
const dates = forecast.list.map(d => d.dt_txt)

const margin = { top: 0, right: 0, bottom: 30, left: 20 }



const MAX_TEMP = d3.max(temperatures)
const MIN_TEMP = d3.min(temperatures)

const colors = d3
        .scaleLinear()
        .domain([MIN_TEMP, 70, MAX_TEMP])
        .range(['royalblue', 'wheat', 'crimson'])


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
        .range([h, 0])


const yAxis = d3.axisLeft(yAxisValues).ticks(10)


const xAxisValues = d3.scaleTime()
        .domain([dates[0], dates[dates.length - 1]])
        .range([0, w])

const xAxis = d3.axisBottom(xAxisValues).ticks(d3.timeDay.every(1))

const xMargin = xScale.copy().range([margin.lefth, width - margin.left])
const yMargin = yScale.copy().range([h - margin.bottom, margin.bottom])
  

    const [tooltip, setTooltip] = useState(initial)
    const handleHover = (e, t) => {
        setTooltip({
            hover: Number(e.target.dataset.idx),
            x: e.clientX - 35,
            y: e.clientY - 30,
            content: 'Temp: ' + t + '°F'
        })
    }

    const resetHover = e => {
        setTooltip(initial)
    }

    console.log(xMargin,  yMargin)

    useEffect(() => {
        // if(yAxis.current && xAxis.current) {
        //     d3.select(yAxis.current)
        //       .attr('transform', 'translate(20,0)')
        //       .call(yAxisTicks)
        
        //     d3.select(xAxis.current)
        //       .attr('transform', 'translate(20,' + height + ')')
        //       .call(xAxisTicks)
        // }
    }, [])

    return (
        <svg width={w - margin.left} height={h} style={{position: 'relative'}}>
            <g width={w} height={h} y={h - yScale(MAX_TEMP)} 
            style={{margin: '2rem'}} 
            transform={`translate(${margin.left}px, ${margin.right}px)`}
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
                                height={yScale(t)-margin.bottom} 
                                x={xScale(t)} 
                                y={h - yScale(t)} 
                                onMouseOver={(e) => handleHover(e, t)}
                            />
                        )
                    })
                }
            </g>
            <g transform={`translate(${margin.left}, 0)`}>{yMargin}</g>
            <g transform={`translate(0, ${h -margin.bottom}px)`}>{xMargin}</g>
            <g className='tooltip'
            style={{transform: `translate(${tooltip.x - w + 64 + (tooltip.hover < 9 ? 145 : 0)}px, ${tooltip.y - 48}px)`}}>
                <text fill='black'>{tooltip.content}</text>
            </g>
        </svg>
    )
}
