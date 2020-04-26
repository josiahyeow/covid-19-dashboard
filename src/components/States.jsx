import React, { useState, useEffect } from 'react'
import State from './State'
import { COUNTRY_STATES } from '../data/countryStates'

const States = ({ country }) => {
  const [states, setStates] = useState([])

  useEffect(() => {
    async function fetchData() {
      const countryStates = COUNTRY_STATES[country]
      if (countryStates) {
        setStates(COUNTRY_STATES[country])
      } else {
        setStates(null)
      }
    }
    fetchData()
  }, [country])

  if (states) {
    return (
      <>
        {states.map((state) => (
          <State key={state} country={country} state={state} />
        ))}
      </>
    )
  } else {
    return <></>
  }
}

export default States
