import csv from 'csvtojson'
import React, { useState, useEffect } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Label,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from 'recharts'
import { covidConfig } from '../config'
import Theme from '../Theme'

const fetchStateData = async (url, report, state) => {
  const data = await (await fetch(`${url}${report}`)).text()
  const parsedData = await csv({
    noheader: true,
    output: 'json',
  }).fromString(data)
  return parsedData.filter((row) => row['field1'] === state)[0]
}

const getActiveData = (confirmedData, recoveredData, deathsData) => {
  const confirmedArray = Object.values(confirmedData)
  const recoveredArray = Object.values(recoveredData)
  const deathsArray = Object.values(deathsData)

  const active = []
  confirmedArray.forEach((confirmed, i) => {
    i > 3 && active.push(confirmed - recoveredArray[i] - deathsArray[i])
  })
  return active
}

const convertToDataArray = (data) => {
  let dataArray = []
  data.map((value, i) => dataArray.push({ x: i, y: value }))
  return dataArray
}

const CovidHistory = ({ state }) => {
  const [active, setActive] = useState([])

  useEffect(() => {
    async function fetchData() {
      const {
        CSSE_BASE,
        CSSE_SERIES,
        CSSE_CONFIRMED,
        CSSE_RECOVERED,
        CSSE_DEATHS,
      } = covidConfig
      const request = `${CSSE_BASE}${CSSE_SERIES}`

      const confirmedData = await fetchStateData(request, CSSE_CONFIRMED, state)
      const recoveredData = await fetchStateData(request, CSSE_RECOVERED, state)
      const deathsData = await fetchStateData(request, CSSE_DEATHS, state)

      setActive(
        convertToDataArray(
          getActiveData(confirmedData, recoveredData, deathsData)
        )
      )
    }
    fetchData()
  }, [])

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart data={active}>
        <Label value="Curb" offset={0} position="center" />
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
          dataKey="y"
          stroke={Theme.color.palette.red}
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CovidHistory
