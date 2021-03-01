import React from 'react'

export default function StatLine(props) {
    const { allData, filteredData } = props
    let allSales = allData.reduce((a, c, i) => {
        return a + (c.data[i] ?? 0)
    }, 0)
    allSales = Math.floor(allSales * 100) / 100
    let filteredSales = filteredData.reduce((a, c, i) => {
        return a + (c.data[i] ?? 0)
    }, 0)
    filteredSales = Math.floor(filteredSales * 100) / 100

    return (
        <div>
            <h1>
                <div>
                    Stats:{' '}
                    <span>
                        {filteredData.length}/{allData.length} countries
                        selected.{' '}
                    </span>
                </div>
                <div>
                    Average sales:{' '}
                    <span>
                        {filteredSales} ({allSales})
                    </span>
                </div>
            </h1>
        </div>
    )
}
