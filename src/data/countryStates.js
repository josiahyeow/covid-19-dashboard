import covid from './covid'

const getCountries = async () => {
  const countries = await covid.countryNames()
  return countries
}

const COUNTRY_STATES = {
  Australia: [
    'Victoria',
    'New South Wales',
    'Queensland',
    'Australian Capital Territory',
    'South Australia',
    'Western Australia',
    'Northern Territory',
    'Tasmania',
  ],
}

export { COUNTRY_STATES, getCountries }
