import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Theme from '../Theme'
import covid from '../covid'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 1rem 0;
`

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 2rem;
  font-weight: bold;
`

const Text = styled.span`
  color: ${Theme.color.text.lightest};
  padding: 0.5rem 0;
`

const Covid = styled.span`
  color: ${Theme.color.text.darkest};
  background-color: ${Theme.color.text.lightest};
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 8px;
`

const CountrySelect = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  color: ${Theme.color.text.lightest};
  background: ${Theme.color.background.darkest};
  border: none;
`

const Header = ({ currentCountry, setCountry }) => {
  const [countries, setCountries] = useState()

  useEffect(() => {
    async function fetchData() {
      setCountries(await covid.countryNames())
    }
    fetchData()
  }, [])

  return (
    <Container>
      <Title>
        <Covid>COVID-19</Covid>
        <Text>Dashboard</Text>
      </Title>
      <CountrySelect
        value={currentCountry}
        onChange={(e) => setCountry(e.target.value)}
      >
        {countries &&
          countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
      </CountrySelect>
    </Container>
  )
}

export default Header
