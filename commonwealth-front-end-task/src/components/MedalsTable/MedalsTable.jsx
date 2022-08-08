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
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {medals.map((medal, i) => (
          <tr key={i}>
            <td>{medal.countryId}</td>
            <td>{medal.gold}</td>
            <td>{medal.silver}</td>
            <td>{medal.bronze}</td>
            <td>{medal.gold}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MedalsTable
