import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ResponsiveContainer, XAxis, YAxis, LineChart, Line } from 'recharts'

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${({ theme }) => theme.color.text.light};
`

const calculateActive = ({ cases, deaths, recovered }) => {
  const confirmedArray = Object.values(cases)
  const deathsArray = Object.values(deaths)
  const recoveredArray = Object.values(recovered)

  const active = []
  confirmedArray.forEach((confirmed, i) => {
    active.push(confirmed - recoveredArray[i] - deathsArray[i])
  })
  return active
}

const convertToDataArray = (data) => {
  let dataArray = []
  data.map((value, i) => dataArray.push({ day: i, activeCases: value }))
  return dataArray
}

const Curve = ({ history, mode }) => {
  const [data, setData] = useState()
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    if (history) {
      setData({
        active: convertToDataArray(calculateActive(history)),
        cases: convertToDataArray(Object.values(history.cases)),
        recovered: convertToDataArray(Object.values(history.recovered)),
        deaths: convertToDataArray(Object.values(history.deaths)),
      })
    }
  }, [history])

  const modeColor = () => {
    switch (mode) {
      case 'cases':
        return themeContext.color.text.lightest
      case 'active':
        return themeContext.color.palette.red
      case 'recovered':
        return themeContext.color.palette.green
      case 'deaths':
        return themeContext.color.palette.darkGrey
      default:
        return themeContext.color.palette.red
    }
  }

  if (data) {
    return (
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart data={data[mode]}>
          <XAxis
            dataKey="name"
            label={{
              value: 'Days',
              position: 'insideBottom',
              style: { fill: themeContext.color.palette.darkGrey },
            }}
          />
          <YAxis
            label={{
              value: 'Active cases',
              angle: -90,
              position: 'insideBottomLeft',
              style: { fill: themeContext.color.palette.darkGrey },
            }}
          />
          <Line
            type="natural"
            dataKey="activeCases"
            stroke={modeColor()}
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
