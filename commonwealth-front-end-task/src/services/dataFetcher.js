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
      const country = countries.countries.find(country => country.id === id)
      if (country === undefined) {
        reject(`No country with id ${id}`)
      }

      resolve({ countries: countries.countries })
    }, randomTimeout())
  })
}

export { getAllMedals, getAllCountries, getCountryById }
