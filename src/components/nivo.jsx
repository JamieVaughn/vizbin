import React from 'react'
import { ResponsiveBullet } from '@nivo/bullet'
// make sure parent container have a defined heightor it defaults to 0
export default function NivoBullet({ data /* see data tab */ }) {
    return (
        <div style={{ height: '500px' }}>
            <ResponsiveBullet
                data={data}
                margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
                spacing={46}
                titleAlign="start"
                titleOffsetX={-70}
                measureSize={0.2}
            />
        </div>
    )
}
