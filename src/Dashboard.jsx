import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { SkeletonTheme } from 'react-loading-skeleton'
import Header from './components/Header'
import Country from './components/Country'
import States from './components/States'
import Footer from './components/Footer'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  min-height: 98vh;
  background-color: ${({ theme }) => theme.color.background.darkest};
  transition: all 0.25s ease-in-out;
  @media only screen and (min-width: 600px) {
    padding: 1.5rem;
  }
`
const Body = styled.div``

const WidgetSection = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const Dashboard = ({ mode, setMode }) => {
  const themeContext = useContext(ThemeContext)
  const [country, setCountry] = useState('Australia')

  return (
    <SkeletonTheme
      color={themeContext.color.background.darker}
      highlightColor={themeContext.color.background.dark}
    >
      <AppContainer>
        <Body>
          <Header
            currentCountry={country}
            setCountry={setCountry}
            mode={mode}
            setMode={setMode}
          />
          <WidgetSection>
            <Country country={country} />
            <States country={country} />
          </WidgetSection>
        </Body>
        <Footer />
      </AppContainer>
    </SkeletonTheme>
  )
}

export default Dashboard
