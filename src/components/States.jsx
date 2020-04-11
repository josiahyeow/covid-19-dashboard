import React, { useState, useEffect } from 'react'
import State from './State'
import { COUNTRY_STATES } from '../data/countryStates'
import covid from '../data/covid'

const States = ({ country }) => {
  const [states, setStates] = useState([])
  const [stateData, setStateData] = useState()

  useEffect(() => {
    async function fetchData() {
      setStateData(await covid.jhucsse())
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
          <State key={state} country={country} state={state} data={stateData} />
        ))}
      </>
    )
  } else {
    return <></>
  }
}

export default States
