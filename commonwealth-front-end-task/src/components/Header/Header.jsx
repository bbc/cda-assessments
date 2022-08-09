import { Link } from 'react-router-dom'
import logo from '../../assets/logo.webp'

import './Header.css'

const Header = () => {
  return (
    <header>
      <img src={logo} alt="comonwealth logo" />
      <h1>
        <Link to={'/'}>Commonwealth Games Birmingham 2022</Link>
      </h1>
    </header>
  )
}

export default Header
