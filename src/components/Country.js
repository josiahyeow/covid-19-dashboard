import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from './Card'
import { getCountryData } from '../Api'

const Statuses = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 24rem;
`

const Status = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 1rem 1rem 0rem;
`

const Label = styled.span`
  font-weight: bold;
`

const Data = styled.span`
  color: ${({ color }) => color};
  font-size: 2rem;
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
      setData(await getCountryData(country))
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

  return (
    <Card title={countryName}>
      <Statuses>
        <Flag src={countryInfo?.flag} />
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
          <Data color={'#f74043'}>{active}</Data>
        </Status>
        <Status>
          <Label>Recovered</Label>
          <Data color={'#40f780'}>{recovered}</Data>
        </Status>
        <Status>
          <Label>Deaths</Label>
          <Data color={'#575757'}>{deaths}</Data>
        </Status>
      </Statuses>
    </Card>
  )
}

export default Country
