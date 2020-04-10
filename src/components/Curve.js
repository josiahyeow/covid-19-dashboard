import React, { useContext } from 'react'
import { ResponsiveContainer, XAxis, YAxis, LineChart, Line } from 'recharts'
import Theme from '../Theme'
import CovidContext from '../CovidContext'

const getActiveData = (confirmedData, recoveredData, deathsData, state) => {
  const confirmedArray = Object.values(
    confirmedData.filter((row) => row['field1'] === state)[0]
  )
  const recoveredArray = Object.values(
    recoveredData.filter((row) => row['field1'] === state)[0]
  )
  const deathsArray = Object.values(
    deathsData.filter((row) => row['field1'] === state)[0]
  )

  const active = []
  confirmedArray.forEach((confirmed, i) => {
    i > 3 && active.push(confirmed - recoveredArray[i] - deathsArray[i])
  })
  return active
}

const convertToDataArray = (data) => {
  let dataArray = []
  data.map((value, i) => dataArray.push({ day: i, activeCases: value }))
  return dataArray
}

const Curve = ({ state }) => {
  const { seriesData } = useContext(CovidContext)

  const { confirmed, recovered, deaths } = seriesData

  const active = convertToDataArray(
    getActiveData(confirmed, recovered, deaths, state)
  )

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart data={active}>
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
}

export default Curve
