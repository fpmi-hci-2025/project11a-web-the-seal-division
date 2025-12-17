import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Favourites from './pages/Favourites/Favourites';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import BookDetails from './pages/BookDetails/BookDetails';
import Profile from './pages/Profile/Profile';
import LogIn from './pages/LogIn/LogIn';
import Register from './pages/Register/Register';
import Checkout from './pages/Checkout/Checkout';
import SalesPage from './pages/Sales/SalesPage';
import AdminAddBook from './pages/AdminAddBook/AdminAddBook';
import AdminOrders from './pages/AdminOrders/AdminOrders';
import About from './pages/About/About';
import Stores from './pages/Stores/Stores';
import Delivery from './pages/Delivery/Delivery';
import Buyers from './pages/Buyers/Buyers';
import Partners from './pages/Partners/Partners';
import Writers from './pages/Writers/Writers';
import { BookProvider } from './context/BookContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LogIn />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Home />;
  }

  return children;
};

function App() {
  // Базовый путь для роутера
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <AuthProvider>
      <BookProvider>
        <Router basename={basename}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route
                path="/profile"
                element={(
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                )}
              />
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/checkout"
                element={(
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                )}
              />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/buyers" element={<Buyers />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/writers" element={<Writers />} />
              <Route
                path="/admin/add-book"
                element={(
                  <AdminRoute>
                    <AdminAddBook />
                  </AdminRoute>
                )}
              />
              <Route
                path="/admin/orders"
                element={(
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                )}
              />
            </Routes>
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;