import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

const CardStyle = styled.div`
  color: ${({ theme }) => theme.color.text.lightest};
  background: ${({ theme }) => theme.color.background.darker};
  padding: 2rem;
  margin: 1rem;
  border-radius: 2rem;
  width: 100%;
  transition: all 0.25s ease-in-out;
  @media only screen and (min-width: 600px) {
    width: 25rem;
  }
`

const Title = styled.h3`
  margin: 0px 0px 16px 0px;
`

const Content = styled.div``

const Card = ({ title, children }) => {
  return (
    <CardStyle>
      <Title>{title || <Skeleton />}</Title>
      <Content>{children}</Content>
    </CardStyle>
  )
}

export default Card
