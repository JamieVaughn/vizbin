import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Navigate from "./components/navigate"
import Home from "./components/home"
import Visx from "./components/visx"
import StackedArea from "./components/victory"
import LineRecharts from "./components/recharts"
import PieReactVis from "./components/reactvis"
import NivoBullet from './components/nivo';
import BrushChart from './components/vx';
import { ZoomPan } from "./components/zoompan"

import { nivoData } from '../public/data/nivo.js'

function App() {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-box">
          <code>{count}</code>
          <Link to="/" style={{width: '50px'}}>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </div>
        <Navigate />
      </header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/visx" element={<Visx />} />
        <Route path="/victory" element={<StackedArea />} />
        <Route path="/recharts" element={<LineRecharts />} />
        <Route path="/reactvis" element={<PieReactVis />} />
        <Route path="/nivo" element={<NivoBullet data={nivoData} />} />
        <Route path="/vx" element={<BrushChart height={400} width={600} />} />
        <Route path="/zoompan" element={<ZoomPan />} />
      </Routes>
    </div>
  );
}

export default App;
