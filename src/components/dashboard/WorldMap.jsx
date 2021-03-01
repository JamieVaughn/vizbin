import React from 'react'
import './App.css'
import { geoMercator, geoPath } from 'd3-geo'

function WorldMap(props) {
    const { onHover, hoverElement, colorScale, size, data } = props

    const projection = geoMercator().scale(100).translate([350, 300])
    const pathGenerator = geoPath().projection(projection)
    const countries = data.map((d, i) => (
        <path
            key={'path' + i}
            d={pathGenerator(d)}
            onMouseEnter={() => {
                onHover(d)
            }}
            style={{
                fill:
                    hoverElement === d.id ? '#FCBC34' : colorScale(d.launchday),
                stroke: 'black',
                strokeOpacity: 0.5,
            }}
            className="countries"
        />
    ))
    return (
        <svg width={size[0] * 2} height={size[1] * 3}>
            {countries}
        </svg>
    )
}

export default WorldMap
