import React, { useState, useEffect } from 'react'
import covid from '../data/covid'
import Status from './Status'

const getDay = (history, daysAgo = 0) => {
  const offset = daysAgo + 1
  const casesArray = Object.values(history.cases)
  const deathsArray = Object.values(history.deaths)
  const recoveredArray = Object.values(history.recovered)
  const cases = casesArray[casesArray.length - offset]
  const deaths = deathsArray[deathsArray.length - offset]
  const recovered = recoveredArray[recoveredArray.length - offset]
  const active = cases - deaths - recovered
  return {
    cases,
    deaths,
    recovered,
    active,
  }
}

const State = ({ country, state }) => {
  const [today, setToday] = useState()
  const [yesterday, setYesterday] = useState()
  const [history, setHistory] = useState()

  useEffect(() => {
    async function fetchData() {
      const { timeline } = await covid.historical(null, country, state)
      if (timeline) {
        setHistory(timeline)
        setToday(getDay(timeline))
        setYesterday(getDay(timeline, 1))
      } else {
        setHistory(undefined)
      }
    }
    fetchData()
  }, [country, state])

  if (today && yesterday) {
    const { cases, active, recovered, deaths } = today
    return (
      <Status
        location={{
          name: state,
          country: country,
          type: 'state',
        }}
        today={{
          cases,
          active,
          recovered,
          deaths,
        }}
        yesterday={yesterday}
        history={history}
      />
    )
  } else {
    return <></>
  }
}

export default State
