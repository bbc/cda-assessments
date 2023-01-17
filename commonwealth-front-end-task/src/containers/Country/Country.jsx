import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CountryDetails from '../../components/CountryDetails'

import { getCountryById } from '../../services/country'

import './Country.css'

const Country = () => {
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [countryDetails, setCountryDetails] = useState(null)

  useEffect(() => {
    setLoading(true)
    setCountryDetails(null)

    getCountryById(id)
      .then(country => {
        setCountryDetails(country)
      })
      .catch(e => setCountryDetails(null))
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p>Loading</p>
  }

  if (countryDetails === null) {
    return <p>No country found for that id</p>
  }

  return (
    <div data-testid="country-container" className="country-container">
      <CountryDetails country={countryDetails} />
    </div>
  )
}

export default Country
