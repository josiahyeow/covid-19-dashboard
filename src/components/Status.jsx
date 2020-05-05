import React, { useState, useContext, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Skeleton from 'react-loading-skeleton'
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
  padding: 0.5rem;
  border-radius: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text.lighter};
  max-height: 5rem;
  ${({ selected, theme }) => {
    if (selected) {
      return `background: ${theme.color.background.dark}; color: ${theme.color.text.lightest}`
    }
  }}
  @media only screen and (min-width: 600px) {
    &:hover {
      transition: all 0.1s ease-in-out;
      background: ${({ theme }) => theme.color.background.darkest};
    }
  }
`

const Label = styled.span`
  ${({ loading }) => loading && `visibility: hidden;`}
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

const FlagSkeleton = styled.div`
  border-radius: 6px;
  margin: 0rem 1rem 1rem 0rem;
`

const Updated = styled.div`
  color: ${({ theme }) => theme.color.text.lighter};
  margin-top: 1rem;
  font-size: 0.7rem;
`

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
`

const StatusSkeleton = () => (
  <SkeletonWrapper>
    <Skeleton height={'3rem'} />
  </SkeletonWrapper>
)

const Status = ({ location, today, yesterday, history }) => {
  const themeContext = useContext(ThemeContext)
  const [mode, setMode] = useState()

  useEffect(() => {
    setMode(null)
    if (yesterday) {
      setMode('active')
    }
  }, [yesterday])

  return (
    <Card title={location && location.name}>
      <Statuses>
        {location &&
          location.type === 'country' &&
          (location.flag ? (
            <Flag src={location.flag} />
          ) : (
            <FlagSkeleton>
              <Skeleton width={'110px'} height={'55px'} />
            </FlagSkeleton>
          ))}
        <StatusItem
          onClick={() => setMode('cases')}
          selected={mode === 'cases'}
        >
          {today && yesterday ? (
            <>
              <Data color={themeContext.color.text.lightest}>
                {today.cases}
                <Difference
                  yesterday={yesterday.cases}
                  today={today.cases}
                  desired={'-'}
                />
              </Data>
            </>
          ) : (
            <>
              <StatusSkeleton />
            </>
          )}
          <Label loading={!yesterday}>Cases</Label>
        </StatusItem>
        <StatusItem
          onClick={() => setMode('active')}
          selected={mode === 'active'}
        >
          {today && yesterday ? (
            <Data color={themeContext.color.palette.red}>
              {today.active}
              <Difference
                yesterday={yesterday.active}
                today={today.active}
                desired={'-'}
              />
            </Data>
          ) : (
            <StatusSkeleton />
          )}
          <Label loading={!yesterday}>Active</Label>
        </StatusItem>
        <StatusItem
          onClick={() => setMode('recovered')}
          selected={mode === 'recovered'}
        >
          {today && yesterday ? (
            <Data color={themeContext.color.palette.green}>
              {today.recovered}
              <Difference
                yesterday={yesterday.recovered}
                today={today.recovered}
                desired={'+'}
              />
            </Data>
          ) : (
            <StatusSkeleton />
          )}
          <Label loading={!yesterday}>Recovered</Label>
        </StatusItem>
        <StatusItem
          onClick={() => setMode('deaths')}
          selected={mode === 'deaths'}
        >
          {today && yesterday ? (
            <Data color={themeContext.color.palette.darkGrey}>
              {today.deaths}
              <Difference
                yesterday={yesterday.deaths}
                today={today.deaths}
                desired={'-'}
              />
            </Data>
          ) : (
            <StatusSkeleton />
          )}
          <Label loading={!yesterday}>Deaths</Label>
        </StatusItem>
      </Statuses>
      <ChartContainer>
        <Curve history={history} mode={mode} />
      </ChartContainer>
      {today && today.updated && (
        <Updated>
          Last updated{' '}
          {new Date(today.updated).toLocaleDateString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </Updated>
      )}
    </Card>
  )
}

export default Status
