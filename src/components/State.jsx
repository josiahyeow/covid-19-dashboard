import React, { useState, useEffect } from 'react'
import covid from '../data/covid'
import Status from './Status'

const calculateYesterday = (history) => {
  const casesArray = Object.values(history.cases)
  const deathsArray = Object.values(history.deaths)
  const recoveredArray = Object.values(history.recovered)
  const cases = casesArray[casesArray.length - 2]
  const deaths = deathsArray[deathsArray.length - 2]
  const recovered = recoveredArray[recoveredArray.length - 2]
  const active = cases - deaths - recovered
  return {
    cases,
    deaths,
    recovered,
    active,
  }
}

const State = ({ country, state, data }) => {
  const [today, setToday] = useState()
  const [yesterday, setYesterday] = useState()
  const [history, setHistory] = useState()

  useEffect(() => {
    async function fetchData() {
      const { timeline } = await covid.historical(null, country, state)
      if (timeline) {
        setHistory(timeline)
        setYesterday(calculateYesterday(timeline))
      } else {
        setHistory(undefined)
      }
    }
    fetchData()
    setToday(
      data.find(
        (stateObj) =>
          stateObj.country === country && stateObj.province === state
      )
    )
  }, [country, state])

  if (today && yesterday) {
    const {
      province,
      country,
      updatedAt,
      stats: { confirmed, recovered, deaths },
    } = today
    return (
      <Status
        location={{
          name: province,
          country: country,
          type: 'state',
        }}
        today={{
          cases: confirmed,
          active: confirmed - recovered - deaths,
          recovered: recovered,
          deaths,
          updated: updatedAt,
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
