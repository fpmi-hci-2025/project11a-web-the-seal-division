import { Link } from 'react-router-dom'
import './Header.module.css'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            BookStore
          </Link>
          <nav className="nav">
            <Link to="/catalog" className="nav-link">Каталог</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header