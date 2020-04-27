import React from 'react'
import styled from 'styled-components'

const CardStyle = styled.div`
  color: ${({ theme }) => theme.color.text.lightest};
  background: ${({ theme }) => theme.color.background.darker};
  padding: 2rem;
  margin: 1rem;
  border-radius: 2rem;
  width: 25rem;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  transition: all 0.25s ease-in-out;
`

const Title = styled.h3`
  margin: 0px 0px 16px 0px;
`

const Content = styled.div``

const Card = ({ title, children }) => {
  return (
    <CardStyle>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </CardStyle>
  )
}

export default Card
