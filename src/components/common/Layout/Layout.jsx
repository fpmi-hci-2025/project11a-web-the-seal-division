import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout