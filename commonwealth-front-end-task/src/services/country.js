// Do not modify these files. These are acting as the API that we are
// requesting against

import countriesFile from '../data/countries.json'

const randomTimeout = () => Math.floor(250 + Math.random() * 300)

const getAllCountries = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(countriesFile.countries)
    }, randomTimeout())
  })
}

const getCountryById = async id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const country = countriesFile.countries.find(country => country.id.toString() === id)
      if (country === undefined) {
        reject(`No country with id ${id}`)
      }

      resolve(country)
    }, randomTimeout())
  })
}

export { getAllCountries, getCountryById }
