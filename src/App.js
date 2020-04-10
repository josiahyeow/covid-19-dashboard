import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CovidProvider } from './CovidContext'
import Header from './components/Header'
import Country from './components/Country'
import State from './components/State'
import Footer from './components/Footer'
import { getReportData, getSeriesData } from './Api'

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
  const [reportData, setReportData] = useState()
  const [seriesData, setSeriesData] = useState()

  useEffect(() => {
    async function fetchData() {
      setReportData(await getReportData())
      setSeriesData(await getSeriesData())
    }
    fetchData()
  }, [])

  return (
    <AppContainer>
      <Body>
        <Header />
        <WidgetSection>
          <Country country={country} />
          {reportData && seriesData && (
            <CovidProvider value={{ reportData, seriesData }}>
              <State state={'Victoria'} />
              <State state={'New South Wales'} />
              <State state={'Queensland'} />
              <State state={'Australian Capital Territory'} />
              <State state={'South Australia'} />
              <State state={'Western Australia'} />
              <State state={'Northern Territory'} />
              <State state={'Tasmania'} />
            </CovidProvider>
          )}
        </WidgetSection>
      </Body>
      <Footer />
    </AppContainer>
  )
}

export default App
