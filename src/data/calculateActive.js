export const calculateActive = ({ cases, deaths, recovered }) => {
  const confirmedArray = Object.values(cases)
  const deathsArray = Object.values(deaths)
  const recoveredArray = Object.values(recovered)

  const active = []
  confirmedArray.forEach((confirmed, i) => {
    active.push(confirmed - recoveredArray[i] - deathsArray[i])
  })
  return active
}
