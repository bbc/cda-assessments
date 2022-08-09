// Do not modify these files. These are acting as the API that we are
// requesting against

import medals from '../data/medals.json'

const randomTimeout = () => Math.floor(250 + Math.random() * 300)

const getAllMedals = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(medals.medals)
    }, randomTimeout())
  })
}

const getMedalsByCountryId = async countryId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const countryMedals = medals.medals.find(medal => medal.countryId === countryId)
      if (!countryMedals) {
        reject(`No medals found for country ${countryId}`)
      }
      resolve(countryMedals)
    }, randomTimeout())
  })
}

export { getAllMedals, getMedalsByCountryId }
