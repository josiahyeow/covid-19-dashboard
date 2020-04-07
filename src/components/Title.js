import React from 'react'
import styled from 'styled-components'

const Welcome = styled.div`
  color: #fff;
  padding: 1.5rem;
`

const Text = styled.h1`
  margin: 0px;
`

const Title = () => {
  return (
    <Welcome>
      <Text>COVID-19 Dashboard 😷 🇦🇺 </Text>
    </Welcome>
  )
}

export default Title
