import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Country from './components/Country'
import States from './components/States'
import Footer from './components/Footer'

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

  return (
    <AppContainer>
      <Body>
        <Header currentCountry={country} setCountry={setCountry} />
        <WidgetSection>
          <Country country={country} />
          <States country={country} />
        </WidgetSection>
      </Body>
      <Footer />
    </AppContainer>
  )
}

export default App
