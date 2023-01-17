import './CountryDetails.css'

const CountryDetails = ({ country }) => (
  <div className="country-details">
    <h2>Country: {country.name}</h2>
    <p>Id: {country.id}</p>
    <p>Code: {country.code}</p>
    <img src={country.flagUrl} alt={`${country.name} flag`} />
  </div>
)

export default CountryDetails
