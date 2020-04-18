import React from 'react'
import styled from 'styled-components'

const StyledDifference = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.text.lighter};
  border-radius: 6px;
  margin-left: 3px;
`

const Difference = ({ yesterday, today }) => {
  let difference = today - yesterday
  if (difference > 0) {
    difference = `⇡${difference}`
  } else {
    difference = `⇣${difference * -1}`
  }

  return <StyledDifference>{difference}</StyledDifference>
}

export default Difference
