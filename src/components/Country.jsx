import React, { useState, useEffect } from 'react'
import covid from '../data/covid'
import Status from './Status'

const Country = ({ country }) => {
  const [today, setToday] = useState()
  const [yesterday, setYesterday] = useState()
  const [history, setHistory] = useState()

  useEffect(() => {
    async function fetchData() {
      const countryData = await covid.countries(country)
      setToday(countryData)
      const yesterdayData = await covid.countries(country, { yesterday: true })
      setYesterday(yesterdayData)
      const { timeline } = await covid.historical(null, country)
      if (timeline) {
        setHistory(timeline)
      } else {
        setHistory(undefined)
      }
    }
    setToday(null)
    setYesterday(null)
    setHistory(null)
    fetchData()
  }, [country])

  return (
    <Status
      location={{
        name: today ? today.country : undefined,
        flag: today ? today.countryInfo.flag : undefined,
        type: 'country',
      }}
      today={today}
      yesterday={yesterday}
      history={history}
    />
  )
}

export default Country
