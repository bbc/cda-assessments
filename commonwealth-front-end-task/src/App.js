import { Routes, Route, Link } from 'react-router-dom'

// Containers
import Home from './containers/Home'
import Country from './containers/Country'

import './App.css'

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          <Link to={'/'}>Commonwealth Games Birmingham 2022</Link>
        </h1>
      </header>
      <Routes>
        <Route path="/country/:id" element={<Country />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
