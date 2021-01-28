import React from 'react'
import { Link } from 'react-router-dom'
// https://github.com/ReactTraining/react-router/blob/dev/docs/installation/getting-started.md
export default function Navigate(props) {
    return (
        <nav>
            <Link to="/visx">VisX</Link>
            <Link to="/victory">Victory</Link>
            <Link to="/zoompan">ZoomPan</Link>
        </nav>
    )
}