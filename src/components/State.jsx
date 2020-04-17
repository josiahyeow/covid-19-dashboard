import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Card from './Card'
import Curve from './Curve'

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
  color: ${({ theme }) => theme.color.text.lighter};
`

const Data = styled.span`
  color: ${({ color }) => color};
  font-size: 2rem;
`

const ChartContainer = styled.div`
  margin-top: 1rem;
  height: 12rem;
`

const State = ({ country, state, data }) => {
  const themeContext = useContext(ThemeContext)

  const stateData = data.find(
    (stateObj) => stateObj.country === country && stateObj.province === state
  )

  if (stateData) {
    const {
      stats: { confirmed, deaths, recovered },
    } = stateData

    return (
      <Card title={state}>
        <Statuses>
          <Status>
            <Label>Cases</Label>
            <Data>{confirmed}</Data>
          </Status>
          <Status>
            <Label>Active</Label>
            <Data color={themeContext.color.palette.red}>
              {Number.isInteger(confirmed)
                ? confirmed - recovered - deaths
                : '-'}
            </Data>
          </Status>
          <Status>
            <Label>Recovered</Label>
            <Data color={themeContext.color.palette.green}>{recovered}</Data>
          </Status>
          <Status>
            <Label>Deaths</Label>
            <Data color={themeContext.color.palette.grey}>{deaths}</Data>
          </Status>
        </Statuses>
        <ChartContainer>
          <Curve country={country} state={state} />
        </ChartContainer>
      </Card>
    )
  } else {
    return <></>
  }
}

export default State
