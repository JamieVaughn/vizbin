import React from 'react'
import { Link } from 'react-router-dom'
// https://github.com/ReactTraining/react-router/blob/dev/docs/installation/getting-started.md
export default function Navigate(props) {
    return (
        <nav>
            <Link to="/d3">D3</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/visx">VisX</Link>
            <Link to="/victory">Victory</Link>
            <Link to="/recharts">Recharts</Link>
            <Link to="/reactvis">React-Vis</Link>
            <Link to="/nivo">Nivo</Link>
            <Link to="/vx">VX</Link>
            <Link to="/wythe">Wythe</Link>
            <Link to="/zoompan">ZoomPan</Link>
        </nav>
    )
}