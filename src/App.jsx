import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout/Layout'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import './App.css'
import APIDocsLink from './components/common/APIDocs/APIDocsLink'

function App() {
  return (
    <><><APIDocsLink/></><div>Bookstore</div></>
    // <Router>
    //   <Layout>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/catalog" element={<Catalog />} />
    //     </Routes>
    //   </Layout>
    // </Router>
  )
}

export default App