import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Navigate from './components/navigate'
import Home from './components/home'
import Visx from './components/visx'
import { D3react } from './components/d3react'
import Dashboard from './components/dashboard/index.jsx'
import StackedArea from './components/victory'
import LineRecharts from './components/recharts'
import PieReactVis from './components/reactvis'
import NivoBullet from './components/nivo'
import { BrushChart, ChordDiagram } from './components/vx'
import WythePlot from './components/wythe'
import { ZoomPan } from './components/zoompan'
import GeometricZoom from './components/geometriczoom'
import {AnimatedCircles} from './components/animatedcircles'
import { WorldMap } from './components/worldmap'
import SimpleLine from './components/simpleline'
import Simplebar from './components/simplebar'
import TreeDiagram from './components/tree'
import ZoomAxis from './components/d3examples/zoomAxis'
import { VegaBar } from './components/vegabar'

import { nivoData } from '../public/data/nivo.js'
import { quality } from '../public/data/quality.js'

function VxToggle() {
    const [toggle, setToggle] = useState(true)
    const handleClick = (e) => setToggle((state) => !state)
    if (toggle) {
        return (
            <>
                <button onClick={handleClick}>Toggle Viz</button>
                <BrushChart height={400} width={600} />
            </>
        )
    } else {
        return (
            <>
                <button onClick={handleClick}>Toggle Viz</button>
                <ChordDiagram width={600} height={400} />
            </>
        )
    }
}

function App() {
    // Create the count state.
    const [count, setCount] = useState(0)
    // Create the counter (+1 every second).
    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000)
        return () => clearTimeout(timer)
    }, [count, setCount])
    // Return the App component.
    return (
        <div className="App">
            <header className="App-header">
                <div className="logo-box">
                    <code>{count}</code>
                    <Link to="/" style={{ width: '50px' }}>
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                </div>
                <Navigate />
            </header>
            <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vegalite" element={<VegaBar />} />
                <Route
                    path="/d3"
                    element={
                        <D3react
                            data={quality}
                            height={40}
                            width={200}
                            margin={20}
                            selectX={(datum) =>
                                new Date(datum.day).setHours(0, 0, 0, 0)
                            }
                            selectY={(datum) => datum.productPerceivedQuality}
                        />
                    }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/visx"
                    element={
                        <>
                            <h1>VisX Heatmap</h1>
                            <Visx height={500} width={800} />
                        </>
                    }
                />
                <Route path="/victory" element={<StackedArea />} />
                <Route path="/recharts" element={<LineRecharts />} />
                <Route path="/reactvis" element={<PieReactVis />} />
                <Route path="/nivo" element={<NivoBullet data={nivoData} />} />
                <Route path="/vx" element={<VxToggle />} />
                <Route
                    path="/wythe"
                    element={
                        <div style={{ margin: '1rem' }}>
                            <WythePlot />
                        </div>
                    }
                />
                <Route path="/zoompan" element={<ZoomPan />} />
                <Route path="/geozoom" element={<GeometricZoom h={400} w={600} />} />
                <Route path="/animated" element={<AnimatedCircles />} />
                <Route path="/map" element={<WorldMap />} />
                <Route path="/line" element={<SimpleLine />} />
                <Route path="/bar" element={<Simplebar />} />
                <Route path="/tree" element={<TreeDiagram />} />
                <Route path="/zoomaxis" element={<ZoomAxis />} />
            </Routes>
            </main>
        </div>
    )
}

export default App
