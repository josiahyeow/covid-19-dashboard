const weatherConfig = {
  OW_KEY: '7800a9dc9c8871b043f0652c468ba53e',
  OW_URL: 'https://api.openweathermap.org/data/2.5/weather?',
  OW_CITY_ID: '2158177',
  OW_UNITS: 'metric',
}

const covidConfig = {
  URL: 'https://corona.lmao.ninja/countries/',
  COUNTRY: 'australia',
  CSSE_BASE:
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/',
  CSSE_REPORT: 'csse_covid_19_daily_reports/',
  CSSE_SERIES: 'csse_covid_19_time_series/',
  CSSE_KEY: 'Victoria, Australia',
  CSSE_CONFIRMED: 'time_series_covid19_confirmed_global.csv',
  CSSE_DEATHS: 'time_series_covid19_deaths_global.csv',
  CSSE_RECOVERED: 'time_series_covid19_recovered_global.csv'
}

export { weatherConfig, covidConfig }
