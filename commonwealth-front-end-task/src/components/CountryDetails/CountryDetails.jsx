import './CountryDetails.css'

const CountryDetails = ({ details }) => (
  <div className="country-details">
    <h2>Country: {details.name}</h2>
    <p>Id: {details.id}</p>
    <p>Code: {details.code}</p>
    <img src={details.flagUrl} alt={`${details.name} flag`} />
  </div>
)

export default CountryDetails
