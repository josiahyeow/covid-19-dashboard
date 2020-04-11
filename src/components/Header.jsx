import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Theme from '../Theme'
import covid from '../data/covid'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 1rem;
  padding: 1rem 0;
`

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
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

const SelectStyle = styled.div`
  color: ${Theme.color.text.lightest};
  position: relative;
  border-radius: 1rem;
  &::after {
    font-family: 'Font Awesome 5 Free';
    content: '\f078';
    font-weight: 900;
    font-size: 1rem;
    top: 16px;
    right: 10px;
    position: absolute;
  }
`

const CountrySelect = styled.select`
  font-weight: bold;
  font-size: 1rem;
  color: ${Theme.color.text.lightest};
  background: ${Theme.color.background.darkest};
  border: none;
  padding: 1rem;
  -webkit-appearance: none;
  appearance: none;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
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
      <SelectStyle>
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
      </SelectStyle>
    </Container>
  )
}

export default Header
