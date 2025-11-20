import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Favourites from './pages/Favourites/Favourites';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import BookDetails from './pages/BookDetails/BookDetails';
import Profile from './pages/Profile/Profile';
import LogIn from './pages/LogIn/LogIn';
import { BookProvider } from './context/BookContext.jsx';
import './styles/global.css';

function App() {
  // Базовый путь для роутера
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <BookProvider>
      <Router basename={basename}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;