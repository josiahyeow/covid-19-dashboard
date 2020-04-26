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
    fetchData()
  }, [country])

  if (today && yesterday) {
    return (
      <Status
        location={{
          name: today.country,
          flag: today.countryInfo.flag,
          type: 'country',
        }}
        today={today}
        yesterday={yesterday}
        history={history}
      />
    )
  } else {
    return <></>
  }
}

export default Country
