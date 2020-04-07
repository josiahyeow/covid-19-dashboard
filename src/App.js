import React from 'react'
import styled from 'styled-components'
import Title from './components/Title'
import Covid from './components/Covid'
import CovidState from './components/CovidState'
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
  return (
    <AppContainer>
      <Body>
        <Title />
        <WidgetSection>
          <Covid />
          <CovidState state={'Victoria'} />
          <CovidState state={'New South Wales'} />
          <CovidState state={'Queensland'} />
          <CovidState state={'Australian Capital Territory'} />
          <CovidState state={'South Australia'} />
          <CovidState state={'Western Australia'} />
          <CovidState state={'Northern Territory'} />
          <CovidState state={'Tasmania'} />
        </WidgetSection>
      </Body>
      <Footer />
    </AppContainer>
  )
}

export default App
