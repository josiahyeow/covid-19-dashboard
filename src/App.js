import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CovidProvider } from './CovidContext'
import Header from './components/Header'
import Covid from './components/Covid'
import CovidState from './components/CovidState'
import Footer from './components/Footer'
import { getCountryData, getReportData, getSeriesData } from './Api'

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
  const [countryData, setCountryData] = useState()
  const [reportData, setReportData] = useState()
  const [seriesData, setSeriesData] = useState()

  useEffect(async () => {
    setCountryData(await getCountryData())
    setReportData(await getReportData())
    setSeriesData(await getSeriesData())
  }, [])

  return (
    <AppContainer>
      <Body>
        <Header />
        <WidgetSection>
          {countryData && reportData && seriesData && (
            <CovidProvider value={{ countryData, reportData, seriesData }}>
              <Covid />
              <CovidState state={'Victoria'} />
              <CovidState state={'New South Wales'} />
              <CovidState state={'Queensland'} />
              <CovidState state={'Australian Capital Territory'} />
              <CovidState state={'South Australia'} />
              <CovidState state={'Western Australia'} />
              <CovidState state={'Northern Territory'} />
              <CovidState state={'Tasmania'} />
            </CovidProvider>
          )}
        </WidgetSection>
      </Body>
      <Footer />
    </AppContainer>
  )
}

export default App
