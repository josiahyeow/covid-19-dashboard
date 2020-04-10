import csv from 'csvtojson'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { covidConfig } from '../config'
import Card from './Card'
import CovidHistory from './CovidHistory'
import Theme from '../Theme'
import CovidContext from '../CovidContext'

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
  margin-top: 1rem;
  height: 12rem;
`

const CovidState = ({ state }) => {
  const { reportData } = useContext(CovidContext)

  const data = reportData.filter(
    (row) => row['Combined_Key'] === `${state}, Australia`
  )[0]

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
