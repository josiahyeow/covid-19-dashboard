import csv from 'csvtojson'
import { config } from './config'

const getCountryData = async (country) =>
  await (await fetch(`${config.NOVELCOVID_URL}${country}`)).json()

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
    const request = `${config.CSSE_BASE_URL}${config.CSSE_REPORT}${date}.csv`
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
  const request = `${config.CSSE_BASE_URL}${config.CSSE_SERIES}`
  const confirmedData = await getSeriesCsv(request, config.CSSE_CONFIRMED)
  const recoveredData = await getSeriesCsv(request, config.CSSE_RECOVERED)
  const deathsData = await getSeriesCsv(request, config.CSSE_DEATHS)
  return {
    confirmed: confirmedData,
    recovered: recoveredData,
    deaths: deathsData,
  }
}

export { getCountryData, getReportData, getSeriesData }
