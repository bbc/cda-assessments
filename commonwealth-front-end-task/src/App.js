import { Routes, Route } from 'react-router-dom'

// Containers & Components
import Header from './components/Header/Header'
import Home from './containers/Home'
import Country from './containers/Country'

import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/country/:id" element={<Country />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
