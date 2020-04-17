import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ResponsiveContainer, XAxis, YAxis, LineChart, Line } from 'recharts'
import Theme from '../Theme'
import covid from '../data/covid'
import { calculateActive } from '../data/calculateActive'

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${Theme.color.text.light};
`

const convertToDataArray = (data) => {
  let dataArray = []
  data.map((value, i) => dataArray.push({ day: i, activeCases: value }))
  return dataArray
}

const Curve = ({ country, state }) => {
  const [activeCases, setActiveCases] = useState()

  useEffect(() => {
    async function fetchData() {
      const { timeline } = await covid.historical(null, country, state)
      if (timeline) {
        const activeData = calculateActive(timeline)
        setActiveCases(convertToDataArray(activeData))
      } else {
        setActiveCases(undefined)
      }
    }
    fetchData()
  }, [country, state])

  if (activeCases) {
    return (
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart data={activeCases}>
          <XAxis
            dataKey="name"
            label={{
              value: 'Days',
              position: 'insideBottom',
              style: { fill: Theme.color.palette.darkGrey },
            }}
          />
          <YAxis
            label={{
              value: 'Active cases',
              angle: -90,
              position: 'insideBottomLeft',
              style: { fill: Theme.color.palette.darkGrey },
            }}
          />
          <Line
            type="natural"
            dataKey="activeCases"
            stroke={Theme.color.palette.red}
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  } else {
    return <NoData>No historical data available</NoData>
  }
}

export default Curve
