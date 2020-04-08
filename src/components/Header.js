import React from 'react'
import styled from 'styled-components'
import Theme from '../Theme'

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

const CountrySelect = styled.div`
  padding: 0.5rem;
  border-radius: 8px;
  color: ${Theme.color.text.lightest};
`

const Header = () => {
  return (
    <Container>
      <Title>
        <Covid>COVID-19</Covid>
        <Text>Dashboard</Text>
      </Title>
      <CountrySelect></CountrySelect>
    </Container>
  )
}

export default Header
