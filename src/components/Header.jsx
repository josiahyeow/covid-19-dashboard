import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import covid from '../data/covid'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 1rem;
  padding-top: 1rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 0;
  }
`

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  @media only screen and (max-width: 600px) {
    margin-bottom: 2rem;
  }
`

const Text = styled.span`
  color: ${({ theme }) => theme.color.text.lightest};
  padding: 0.5rem 0;
`

const Covid = styled.span`
  color: ${({ theme }) => theme.color.background.darkest};
  background-color: ${({ theme }) => theme.color.text.lightest};
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  cursor: pointer;
`

const SelectStyle = styled.div`
  color: ${({ theme }) => theme.color.text.lightest};
  position: relative;
  border-radius: 1rem;
  &::after {
    font-family: 'Font Awesome 5 Free';
    content: '\f078';
    font-weight: 600;
    font-size: 1rem;
    top: 18px;
    right: 16px;
    position: absolute;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const CountrySelect = styled.select`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.text.lightest};
  background: ${({ theme }) => theme.color.background.dark};
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  -webkit-appearance: none;
  appearance: none;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const Header = ({ currentCountry, setCountry, mode, setMode }) => {
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
        <Covid
          onClick={() => {
            setMode(!mode)
            localStorage.setItem('isLightMode', !mode)
          }}
        >
          COVID-19
        </Covid>
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
