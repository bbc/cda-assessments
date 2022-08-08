import { Routes, Route } from 'react-router-dom'
import Home from './containers/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Commonwealth Games Birmingham 2022</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
