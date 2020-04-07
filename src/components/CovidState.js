import csv from 'csvtojson'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { covidConfig } from '../config'
import Card from './Card'
import CovidHistory from './CovidHistory'
import Theme from '../Theme'

const Statuses = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Status = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 1rem 1rem 0rem;
`

const Label = styled.span`
  font-weight: bold;
  color: ${Theme.color.text.lighter};
`

const Data = styled.span`
  color: ${({ color }) => color};
  font-size: 2rem;
`

const ChartContainer = styled.div`
  max-height: 14rem;
`

const getFilename = (offset = 0) => {
  const date = new Date()
  date.setDate(date.getDate() - (1 + offset))
  const formattedDate = date
    .toLocaleString('en-US')
    .split(/\D/)
    .slice(0, 3)
    .map((num) => num.padStart(2, '0'))
    .join('-')
  return `${formattedDate}.csv`
}

const CovidState = ({ state }) => {
  const [data, setData] = useState({})
  const [filename, setFilename] = useState(getFilename())

  useEffect(() => {
    function fetchData() {
      const { CSSE_BASE, CSSE_REPORT } = covidConfig
      const request = `${CSSE_BASE}${CSSE_REPORT}${filename}`
      fetch(request)
        .then((response) => response.text())
        .then((text) => {
          csv({
            noheader: true,
            output: 'json',
            headers: [
              'FIPS',
              'Admin2',
              'state',
              'Country_Region',
              'Last_Update',
              'Lat',
              'Long',
              'cases',
              'deaths',
              'recovered',
              'active',
              'Combined_Key',
            ],
          })
            .fromString(text)
            .then((parsedData) =>
              setData(
                parsedData.filter(
                  (row) => row['Combined_Key'] === `${state}, Australia`
                )[0]
              )
            )
        })
        .catch(setFilename(getFilename(1)))
    }
    fetchData()
  }, [filename])

  return (
    <Card title={`${data ? data.state : '-'}`}>
      <Statuses>
        <Status>
          <Label>Cases</Label>
          <Data>{data ? data.cases : '-'}</Data>
        </Status>
        <Status>
          <Label>Active</Label>
          <Data color={Theme.color.palette.red}>
            {data ? data.active : '-'}
          </Data>
        </Status>
        <Status>
          <Label>Recovered</Label>
          <Data color={Theme.color.palette.green}>
            {data ? data.recovered : '-'}
          </Data>
        </Status>
        <Status>
          <Label>Deaths</Label>
          <Data color={Theme.color.palette.grey}>
            {data ? data.deaths : '-'}
          </Data>
        </Status>
      </Statuses>
      <ChartContainer>
        <CovidHistory state={state} />
      </ChartContainer>
    </Card>
  )
}

export default CovidState
