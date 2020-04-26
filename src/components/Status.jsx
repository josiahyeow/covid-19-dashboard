import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Card from './Card'
import Curve from './Curve'
import Difference from './Difference'

const Statuses = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StatusItem = styled.div`
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
  display: flex;
  align-items: center;
`

const ChartContainer = styled.div`
  margin-top: 1rem;
  height: 12rem;
`

const Flag = styled.img`
  max-width: auto;
  max-height: 55px;
  width: auto;
  height: auto;
  border-radius: 6px;
  margin: 0rem 1rem 1rem 0rem;
`

const Updated = styled.div`
  color: ${({ theme }) => theme.color.text.lighter};
  margin-top: 1rem;
  font-size: 0.7rem;
`

const Status = ({ location, today, yesterday, history }) => {
  const themeContext = useContext(ThemeContext)

  if (today && yesterday) {
    const { cases, active, recovered, deaths, updated } = today
    return (
      <Card title={location.name}>
        <Statuses>
          {location.type === 'country' && <Flag src={location.flag} />}
          <StatusItem>
            <Data>
              {cases}
              <Difference
                yesterday={yesterday.cases}
                today={cases}
                desired={'-'}
              />
            </Data>
            <Label>Cases</Label>
          </StatusItem>
          <StatusItem>
            <Data color={themeContext.color.palette.red}>
              {active}
              <Difference
                yesterday={yesterday.active}
                today={active}
                desired={'-'}
              />
            </Data>
            <Label>Active</Label>
          </StatusItem>
          <StatusItem>
            <Data color={themeContext.color.palette.green}>
              {recovered}
              <Difference
                yesterday={yesterday.recovered}
                today={recovered}
                desired={'+'}
              />
            </Data>
            <Label>Recovered</Label>
          </StatusItem>
          <StatusItem>
            <Data color={themeContext.color.palette.grey}>
              {deaths}
              <Difference
                yesterday={yesterday.deaths}
                today={deaths}
                desired={'-'}
              />
            </Data>
            <Label>Deaths</Label>
          </StatusItem>
        </Statuses>
        <ChartContainer>
          <Curve history={history} />
        </ChartContainer>
        {updated && (
          <Updated>
            Last updated{' '}
            {new Date(updated).toLocaleDateString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </Updated>
        )}
      </Card>
    )
  } else {
    return <></>
  }
}

export default Status
