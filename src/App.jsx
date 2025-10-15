import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout/Layout'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import './App.css'

function App() {
  return (
    <BrowserRouter basename='/project11a-web-the-seal-division'>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App