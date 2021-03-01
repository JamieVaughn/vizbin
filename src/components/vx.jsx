import React, { useState, useMemo } from 'react'
import { scaleTime, scaleLinear } from '@vx/scale'
import appleStock from '@vx/mock-data/lib/mocks/appleStock'
import { Brush } from '@vx/brush'
import { PatternLines } from '@vx/pattern'
import { LinearGradient } from '@vx/gradient'
import { max, extent } from 'd3-array'

import AreaChart from './areachart'

// Initialize some variables
const stock = appleStock.slice(1000)
const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 }
const chartSeparation = 30
const PATTERN_ID = 'brush_pattern'
const GRADIENT_ID = 'brush_gradient'
export const accentColor = '#f6acc8'
export const background = '#584153'
export const background2 = '#af8baf'
const selectedBrushStyle = {
    fill: `url(#${PATTERN_ID})`,
    stroke: 'white',
}

// accessors
const getDate = (d) => new Date(d.date)
const getStockValue = (d) => d.close

// export type BrushProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
//   compact?: boolean;
// };

function BrushChart({
    compact = false,
    width,
    height,
    margin = {
        top: 20,
        left: 50,
        bottom: 20,
        right: 20,
    },
}) {
    const [filteredStock, setFilteredStock] = useState(stock)

    const onBrushChange = (domain) => {
        if (!domain) return
        const { x0, x1, y0, y1 } = domain
        const stockCopy = stock.filter((s) => {
            const x = getDate(s).getTime()
            const y = getStockValue(s)
            return x > x0 && x < x1 && y > y0 && y < y1
        })
        setFilteredStock(stockCopy)
    }

    const innerHeight = height - margin.top - margin.bottom
    const topChartBottomMargin = compact
        ? chartSeparation / 2
        : chartSeparation + 10
    const topChartHeight = 0.8 * innerHeight - topChartBottomMargin
    const bottomChartHeight = innerHeight - topChartHeight - chartSeparation

    // bounds
    const xMax = Math.max(width - margin.left - margin.right, 0)
    const yMax = Math.max(topChartHeight, 0)
    const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0)
    const yBrushMax = Math.max(
        bottomChartHeight - brushMargin.top - brushMargin.bottom,
        0,
    )

    // scales
    const dateScale = useMemo(
        () =>
            scaleTime({
                range: [0, xMax],
                domain: extent(filteredStock, getDate),
            }),
        [xMax, filteredStock],
    )
    const stockScale = useMemo(
        () =>
            scaleLinear({
                range: [yMax, 0],
                domain: [0, max(filteredStock, getStockValue) || 0],
                nice: true,
            }),
        [yMax, filteredStock],
    )
    const brushDateScale = useMemo(
        () =>
            scaleTime({
                range: [0, xBrushMax],
                domain: extent(stock, getDate),
            }),
        [xBrushMax],
    )
    const brushStockScale = useMemo(
        () =>
            scaleLinear({
                range: [yBrushMax, 0],
                domain: [0, max(stock, getStockValue) || 0],
                nice: true,
            }),
        [yBrushMax],
    )

    const initialBrushPosition = useMemo(
        () => ({
            start: { x: brushDateScale(getDate(stock[50])) },
            end: { x: brushDateScale(getDate(stock[100])) },
        }),
        [brushDateScale],
    )

    return (
        <div>
            <h1>Brush Chart</h1>
            <svg width={width} height={height}>
                <LinearGradient
                    id={GRADIENT_ID}
                    from={background}
                    to={background2}
                    rotate={45}
                />
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill={`url(#${GRADIENT_ID})`}
                    rx={14}
                />
                <AreaChart
                    hideBottomAxis={compact}
                    data={filteredStock}
                    width={width}
                    margin={{ ...margin, bottom: topChartBottomMargin }}
                    yMax={yMax}
                    xScale={dateScale}
                    yScale={stockScale}
                    gradientColor={background2}
                />
                <AreaChart
                    hideBottomAxis
                    hideLeftAxis
                    data={stock}
                    width={width}
                    yMax={yBrushMax}
                    xScale={brushDateScale}
                    yScale={brushStockScale}
                    margin={brushMargin}
                    top={topChartHeight + topChartBottomMargin + margin.top}
                    gradientColor={background2}
                >
                    <PatternLines
                        id={PATTERN_ID}
                        height={8}
                        width={8}
                        stroke={accentColor}
                        strokeWidth={1}
                        orientation={['diagonal']}
                    />
                    <Brush
                        xScale={brushDateScale}
                        yScale={brushStockScale}
                        width={xBrushMax}
                        height={yBrushMax}
                        margin={brushMargin}
                        handleSize={8}
                        resizeTriggerAreas={['left', 'right']}
                        brushDirection="horizontal"
                        initialBrushPosition={initialBrushPosition}
                        onChange={onBrushChange}
                        onClick={() => setFilteredStock(stock)}
                        selectedBoxStyle={selectedBrushStyle}
                    />
                </AreaChart>
            </svg>
        </div>
    )
}

import { Arc } from '@vx/shape'
import { Group } from '@vx/group'
import { Chord, Ribbon } from '@vx/chord'
import { scaleOrdinal } from '@vx/scale'

const pink = '#ff2fab'
const orange = '#ffc62e'
const purple = '#dc04ff'
const purple2 = '#7324ff'
const red = '#d04376'
const green = '#52f091'
const blue = '#04a6ff'
const lime = '#00ddc6'
const bg = '#e4e3d8'

const dataMatrix = [
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907],
]

function descending(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
}

const color = scaleOrdinal({
    domain: [0, 1, 2, 3],
    range: [
        'url(#gpinkorange)',
        'url(#gpurplered)',
        'url(#gpurplegreen)',
        'url(#gbluelime)',
    ],
})

// export type ChordProps = {
//   width: number;
//   height: number;
//   centerSize?: number;
//   events?: boolean;
// };

function ChordDiagram({ width, height, centerSize = 20, events = false }) {
    const outerRadius = Math.min(width, height) * 0.5 - (centerSize + 10)
    const innerRadius = outerRadius - centerSize

    return width < 10 ? null : (
        <div className="chords" style={{ alignItems: 'center' }}>
            <svg width={width} height={height}>
                <LinearGradient
                    id="gpinkorange"
                    from={pink}
                    to={orange}
                    vertical={false}
                />
                <LinearGradient
                    id="gpurplered"
                    from={purple}
                    to={red}
                    vertical={false}
                />
                <LinearGradient
                    id="gpurplegreen"
                    from={purple2}
                    to={green}
                    vertical={false}
                />
                <LinearGradient
                    id="gbluelime"
                    from={blue}
                    to={lime}
                    vertical={false}
                />
                <rect width={width} height={height} fill={bg} rx={14} />
                <Group top={height / 2} left={width / 2}>
                    <Chord
                        matrix={dataMatrix}
                        padAngle={0.05}
                        sortSubgroups={descending}
                    >
                        {({ chords }) => (
                            <g>
                                {chords.groups.map((group, i) => (
                                    <Arc
                                        key={`key-${i}`}
                                        data={group}
                                        innerRadius={innerRadius}
                                        outerRadius={outerRadius}
                                        fill={color(i)}
                                        onClick={() => {
                                            if (events)
                                                alert(
                                                    `${JSON.stringify(group)}`,
                                                )
                                        }}
                                    />
                                ))}
                                {chords.map((chord, i) => {
                                    return (
                                        <Ribbon
                                            key={`ribbon-${i}`}
                                            chord={chord}
                                            radius={innerRadius}
                                            fill={color(chord.target.index)}
                                            fillOpacity={0.75}
                                            onClick={() => {
                                                if (events)
                                                    alert(
                                                        `${JSON.stringify(
                                                            chord,
                                                        )}`,
                                                    )
                                            }}
                                        />
                                    )
                                })}
                            </g>
                        )}
                    </Chord>
                </Group>
            </svg>
            <style jsx>{`
                .chords {
                    display: flex;
                    flex-direction: column;
                    user-select: none;
                }
                svg {
                    margin: 1rem 0;
                    cursor: pointer;
                }
                .deets {
                    display: flex;
                    flex-direction: row;
                    font-size: 12px;
                }
                .deets > div {
                    margin: 0.25rem;
                }
            `}</style>
        </div>
    )
}

export { BrushChart, ChordDiagram }
