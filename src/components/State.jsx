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
const Updated = styled.div`
  color: ${({ theme }) => theme.color.text.lighter};
  margin-top: 1rem;
  font-size: 0.7rem;
`

const State = ({ country, state, data }) => {
  const themeContext = useContext(ThemeContext)

  const stateData = data.find(
    (stateObj) => stateObj.country === country && stateObj.province === state
  )

  if (stateData) {
    const {
      updatedAt,
      stats: { confirmed, deaths, recovered },
    } = stateData

    return (
      <Card title={state}>
        <Statuses>
          <Status>
            <Data>{confirmed}</Data>
            <Label>Cases</Label>
          </Status>
          <Status>
            <Data color={themeContext.color.palette.red}>
              {Number.isInteger(confirmed)
                ? confirmed - recovered - deaths
                : '-'}
            </Data>
            <Label>Active</Label>
          </Status>
          <Status>
            <Data color={themeContext.color.palette.green}>{recovered}</Data>
            <Label>Recovered</Label>
          </Status>
          <Status>
            <Data color={themeContext.color.palette.grey}>{deaths}</Data>
            <Label>Deaths</Label>
          </Status>
        </Statuses>
        <ChartContainer>
          <Curve country={country} state={state} />
        </ChartContainer>
        <Updated>
          Last updated{' '}
          {new Date(updatedAt).toLocaleDateString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </Updated>
      </Card>
    )
  } else {
    return <></>
  }
}

export default State
