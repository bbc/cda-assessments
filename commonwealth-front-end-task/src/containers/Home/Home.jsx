import { useEffect } from 'react'
import { useState } from 'react'

// Services
import { getAllMedals } from '../../services/dataFetcher'

// Components
import MedalsTable from '../../components/MedalsTable'

import './Home.css'

const Medals = () => {
  const [medals, setMedals] = useState([])
  const [medalsLoading, setMedalsLoading] = useState(false)

  useEffect(() => {
    setMedalsLoading(true)

    getAllMedals()
      .then(medals => setMedals(medals))
      .finally(() => {
        setMedalsLoading(false)
      })
  }, [])

  return (
    <div data-testid="home-container" className="home">
      {medalsLoading ? <p>Loading</p> : <MedalsTable medals={medals} />}
    </div>
  )
}

export default Medals
