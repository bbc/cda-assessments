import { Link } from 'react-router-dom'
import './MedalsTable.css'

const MedalsTable = ({ medals }) => {
  return (
    <table id="medals-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>Gold</th>
          <th>Silver</th>
          <th>Bronze</th>
          <th>Total Medals</th>
        </tr>
      </thead>
      <tbody>
        {medals.map((medal, i) => (
          <tr key={i}>
            <td>
              <Link to={`/country/${medal.countryId}`}>{medal.countryId}</Link>
            </td>
            <td>{medal.gold}</td>
            <td>{medal.silver}</td>
            <td>{medal.bronze}</td>
            <td>{medal.gold * 3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MedalsTable
