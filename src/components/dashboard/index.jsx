import React, { useEffect, useState } from 'react'
import './App.css'
import WorldMap from './WorldMap'
import BarChart from './BarChart'
import StreamGraph from './StreamGraph'
import Brush from './Brush'
import StatLine from './StatLine'
import worlddata from '../../../public/data/americas'
import * as d3 from 'd3'

const appdata = worlddata.features.filter(
    (d) => d3.geoPath().centroid(d)[0] < -20,
)

appdata.forEach((d, i) => {
    const offset = Math.random()
    d.launchday = i
    d.data = Array(30)
        .fill(1)
        .map((p, q) => (q < i ? 0 : Math.random() * 2 + offset))
})

const colorScale = d3
    .scaleThreshold()
    .domain([5, 10, 20, 30])
    .range(['#75739F', '#5EAFC6', '#41A368', '#93C464'])

function Dashboard() {
    const [state, setState] = useState({
        screenWidth: 600,
        screenHeight: 300,
        hover: 'none',
        brushExtent: [0, 40],
    })
    const [filteredAppdata, setFilteredAppdata] = useState(appdata)
    // const onResize = () => {
    //   setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120 })
    // }

    const onHover = (d) => {
        setState((state) => ({ ...state, hover: d.id }))
    }

    const onBrush = (d) => {
        setState((state) => ({ ...state, brushExtent: d }))
    }

    // useEffect(() => {
    //   window.addEventListener('resize', onResize, false)
    //   onResize()
    // }, [])
    useEffect(() => {
        if (appdata.length) {
            setFilteredAppdata(
                appdata.filter(
                    (d) =>
                        d.launchday >= state.brushExtent[0] &&
                        d.launchday <= state.brushExtent[1],
                ),
            )
        }
    }, [state.brushExtent])

    return (
        <div className="App" style={{ maxWidth: '100vw' }}>
            <h2>D3 Dashboard</h2>
            <div>
                <StatLine allData={appdata} filteredData={filteredAppdata} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <StreamGraph
                        hoverElement={state.hover}
                        onHover={onHover}
                        colorScale={colorScale}
                        data={filteredAppdata}
                        size={[state.screenWidth, state.screenHeight / 2]}
                    />
                    <Brush
                        changeBrush={onBrush}
                        size={[state.screenWidth, 50]}
                    />
                </div>
                <WorldMap
                    hoverElement={state.hover}
                    onHover={onHover}
                    colorScale={colorScale}
                    data={filteredAppdata}
                    size={[state.screenWidth / 2, state.screenHeight / 2]}
                />
                <BarChart
                    hoverElement={state.hover}
                    onHover={onHover}
                    colorScale={colorScale}
                    data={filteredAppdata}
                    size={[state.screenWidth / 2, state.screenHeight / 2]}
                />
            </div>
        </div>
    )
}

export default Dashboard
