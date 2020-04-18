import React from 'react'
import styled from 'styled-components'

const StyledDifference = styled.span`
  font-size: 1rem;
  border-radius: 6px;
  margin-left: 4px;
  padding: 4px;
  border-radius: 6px;
  ${({ variant, theme }) => {
    console.log(variant)
    switch (variant) {
      case 'good':
        return `color: ${theme.color.palette.green};
        background-color: rgba(64, 247, 128, 0.05);`
      case 'bad':
        return `color: ${theme.color.palette.red};
      background-color: rgba(253, 65, 60, 0.05);`
      default:
        return `color: ${theme.color.palette.orange};
        background-color: rgba(254, 188, 44, 0.05);`
    }
  }}
`

const getVariant = (desired, actual) => (desired === actual ? 'good' : 'bad')

const getDifference = (yesterday, today, desired) => {
  const difference = today - yesterday
  if (difference > 0) {
    return {
      text: `⇡${difference}`,
      variant: getVariant(desired, '+'),
    }
  } else if (difference < 0) {
    return {
      text: `⇣${difference * -1}`,
      variant: getVariant(desired, '-'),
    }
  } else {
    return {
      text: `${difference}`,
      variant: 'neutral',
    }
  }
}

const Difference = ({ yesterday, today, desired }) => {
  const difference = getDifference(yesterday, today, desired)
  console.log('hello', difference)

  return (
    <StyledDifference variant={difference.variant}>
      {difference.text}
    </StyledDifference>
  )
}

export default Difference
