import medals from '../data/medals.json'
import countries from '../data/countries.json'

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

const getAllCountries = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(countries.countries)
    }, randomTimeout())
  })
}

const getCountryById = async id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const country = countries.countries.find(country => country.id.toString() === id)
      if (country === undefined) {
        reject(`No country with id ${id}`)
      }

      resolve(country)
    }, randomTimeout())
  })
}

export { getAllMedals, getAllCountries, getCountryById, getMedalsByCountryId }
