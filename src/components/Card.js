import React from 'react'
import styled from 'styled-components'
import Theme from '../Theme'

const CardStyle = styled.div`
  color: ${Theme.color.text.lightest};
  background: ${Theme.color.background.dark};
  padding: 2rem;
  margin: 1rem;
  border-radius: 24px;
  width: 23rem;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const Title = styled.h3`
  margin: 0px 0px 16px 0px;
`

const Content = styled.div``

const Card = ({ title, children }) => {
  return (
    <CardStyle>
      <Title>{title.toUpperCase()}</Title>
      <Content>{children}</Content>
    </CardStyle>
  )
}

export default Card
