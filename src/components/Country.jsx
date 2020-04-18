import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Card from './Card'
import covid from '../data/covid'
import Curve from './Curve'
import Difference from './Difference'

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

const Country = ({ country }) => {
  const themeContext = useContext(ThemeContext)
  const [data, setData] = useState({
    country: '-',
    cases: '-',
    todayCases: '-',
    deaths: '-',
    recovered: '-',
    active: '-',
    countryInfo: {
      flag: '',
    },
  })
  const [yesterday, setYesterday] = useState()

  useEffect(() => {
    async function fetchData() {
      const countryData = await covid.countries(country)
      setData(countryData)
      const yesterdayData = await covid.countries(country, { yesterday: true })
      setYesterday(yesterdayData)
    }
    fetchData()
  }, [country])

  const {
    country: countryName,
    cases,
    todayCases,
    deaths,
    recovered,
    active,
    countryInfo,
  } = data

  if (data && yesterday) {
    return (
      <Card title={countryName}>
        <Statuses>
          <Flag src={countryInfo.flag} />
          <Status>
            <Data>
              {cases}
              <Difference
                yesterday={yesterday.cases}
                today={cases}
                desired={'-'}
              />
            </Data>
            <Label>Cases</Label>
          </Status>
          <Status>
            <Data color={themeContext.color.palette.red}>
              {active}
              <Difference
                yesterday={yesterday.active}
                today={active}
                desired={'-'}
              />
            </Data>
            <Label>Active</Label>
          </Status>
          <Status>
            <Data color={themeContext.color.palette.green}>
              {recovered}
              <Difference
                yesterday={yesterday.recovered}
                today={recovered}
                desired={'+'}
              />
            </Data>
            <Label>Recovered</Label>
          </Status>
          <Status>
            <Data color={themeContext.color.palette.grey}>
              {deaths}
              <Difference
                yesterday={yesterday.deaths}
                today={deaths}
                desired={'-'}
              />
            </Data>
            <Label>Deaths</Label>
          </Status>
        </Statuses>
        <ChartContainer>
          <Curve country={country} />
        </ChartContainer>
      </Card>
    )
  } else {
    return <></>
  }
}

export default Country
