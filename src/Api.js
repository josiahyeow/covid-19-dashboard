import csv from 'csvtojson'
import { covidConfig } from './config'

const getCountryData = async () => {
  const { URL, COUNTRY } = covidConfig
  const request = `${URL}${COUNTRY}`
  return await (await fetch(request)).json()
}

const getReportData = async () => {
  let retries = 0
  const getDate = (offset = 0) => {
    const date = new Date()
    date.setDate(date.getDate() - (1 - offset))
    const formattedDate = date
      .toLocaleString('en-US')
      .split(/\D/)
      .slice(0, 3)
      .map((num) => num.padStart(2, '0'))
      .join('-')
    return formattedDate
  }

  const getData = async (date) => {
    const { CSSE_BASE, CSSE_REPORT } = covidConfig
    const request = `${CSSE_BASE}${CSSE_REPORT}${date}.csv`
    try {
      const response = await fetch(request)
      const text = await response.text()
      return csv({
        noheader: true,
        output: 'json',
        headers: [
          'FIPS',
          'Admin2',
          'state',
          'Country_Region',
          'Last_Update',
          'Lat',
          'Long',
          'cases',
          'deaths',
          'recovered',
          'active',
          'Combined_Key',
        ],
      }).fromString(text)
    } catch (e) {
      retries += 1
      return getData(getDate(retries))
    }
  }
  return await getData(getDate())
}

const getSeriesData = async () => {
  const getSeriesCsv = async (url, report) => {
    const data = await (await fetch(`${url}${report}`)).text()
    const parsedData = await csv({
      noheader: true,
      output: 'json',
    }).fromString(data)
    return parsedData
  }

  const {
    CSSE_BASE,
    CSSE_SERIES,
    CSSE_CONFIRMED,
    CSSE_RECOVERED,
    CSSE_DEATHS,
  } = covidConfig
  const request = `${CSSE_BASE}${CSSE_SERIES}`

  const confirmedData = await getSeriesCsv(request, CSSE_CONFIRMED)
  const recoveredData = await getSeriesCsv(request, CSSE_RECOVERED)
  const deathsData = await getSeriesCsv(request, CSSE_DEATHS)

  return {
    confirmed: confirmedData,
    recovered: recoveredData,
    deaths: deathsData,
  }
}

export { getCountryData, getReportData, getSeriesData }
