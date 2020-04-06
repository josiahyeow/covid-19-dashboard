import React from 'react'
import styled from 'styled-components'

const CardStyle = styled.div`
  background: #fff;
  padding: 1rem;
  margin: 1.5rem;
  border-radius: 12px;
  -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
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
      <Title>{title}</Title>
      <Content>{children}</Content>
    </CardStyle>
  )
}

export default Card
