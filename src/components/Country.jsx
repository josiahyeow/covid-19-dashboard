import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Card from './Card'
import covid from '../data/covid'
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

  useEffect(() => {
    async function fetchData() {
      const countryData = await covid.countries(country)
      setData(countryData)
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

  if (data) {
    return (
      <Card title={countryName}>
        <Statuses>
          <Flag src={countryInfo.flag} />
          <Status>
            <Label>Cases</Label>
            <Data>{cases}</Data>
          </Status>
          <Status>
            <Label>Today</Label>
            <Data> {todayCases}</Data>
          </Status>
          <Status>
            <Label>Active</Label>
            <Data color={themeContext.color.palette.red}>{active}</Data>
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
          <Curve country={country} />
        </ChartContainer>
      </Card>
    )
  } else {
    return <></>
  }
}

export default Country
