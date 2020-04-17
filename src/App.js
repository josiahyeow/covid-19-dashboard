import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from './components/Header'
import Country from './components/Country'
import States from './components/States'
import Footer from './components/Footer'
import darkTheme from './themes/dark'
import lightTheme from './themes/light'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  @media only screen and (min-width: 600px) {
    padding: 1.5rem;
  }
  min-height: 98vh;
  background-color: ${({ theme }) => theme.color.background.darkest};
`
const Body = styled.div``

const WidgetSection = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const App = () => {
  const [country, setCountry] = useState('Australia')
  const [lightMode, setLightMode] = useState(true)

  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <AppContainer>
        <Body>
          <Header
            currentCountry={country}
            setCountry={setCountry}
            mode={lightMode}
            setMode={setLightMode}
          />
          <WidgetSection>
            <Country country={country} />
            <States country={country} />
          </WidgetSection>
        </Body>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
