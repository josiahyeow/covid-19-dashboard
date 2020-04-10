import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Country from './components/Country'
import State from './components/State'
import Footer from './components/Footer'
import COUNTRY_STATES from './countryStates'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  @media only screen and (min-width: 600px) {
    padding: 1.5rem;
  }
  min-height: 98vh;
`
const Body = styled.div``

const WidgetSection = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const App = () => {
  const [country, setCountry] = useState('Australia')
  const [states, setStates] = useState([])

  useEffect(() => {
    setStates(COUNTRY_STATES[country])
  }, [country])

  return (
    <AppContainer>
      <Body>
        <Header setCountry={setCountry} />
        <WidgetSection>
          <Country country={country} />
          {states.map((state) => (
            <State country={country} state={state} />
          ))}
        </WidgetSection>
      </Body>
      <Footer />
    </AppContainer>
  )
}

export default App
