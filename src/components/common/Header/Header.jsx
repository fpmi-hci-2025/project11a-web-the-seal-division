import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../../../context/useBookContext';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { state } = useBookContext();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/favourites');
  };

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/cart');
  };

  const handleCatalog = () => {
    navigate('/catalog');
  };

  const handleSales = () => {
    navigate('/sales');
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const getCartItemsCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getUnreadNotificationsCount = () => {
    if (!user || !user.notifications) return 0;
    return user.notifications.filter((n) => !n.read).length;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__left">
            <button className="header-logo" onClick={handleLogoClick}>
              Мир Книг
            </button>
            <button className="header-link" onClick={handleCatalog}>
              Каталог
            </button>
            <button className="header-link" onClick={handleSales}>
              Акции
            </button>
            {isAuthenticated && user?.role === 'admin' && (
              <>
                <button
                  className="header-link header-link--admin"
                  onClick={() => navigate('/admin/add-book')}
                >
                  Админ: добавить книгу
                </button>
                <button
                  className="header-link header-link--admin"
                  onClick={() => navigate('/admin/orders')}
                >
                  Админ: заказы
                </button>
              </>
            )}
          </div>
          <div className="header__right">
            <button 
              className="header-btn" 
              onClick={handleFavorites}
              type="button"
              aria-label="Избранное"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill="none" strokeLinejoin="round" />
              </svg>
              <span>Избранное</span>
              {state.favorites.length > 0 && (
                <span className="badge">{state.favorites.length}</span>
              )}
            </button>
            <button 
              className="header-btn" 
              onClick={handleCart}
              type="button"
              aria-label="Корзина"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.6-1.35 2.45c-.16.28-.25.61-.25.95 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.37h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Корзина</span>
              {getCartItemsCount() > 0 && (
                <span className="badge">{getCartItemsCount()}</span>
              )}
            </button>
            <button 
              className="header-btn" 
              onClick={handleProfileClick}
              type="button"
              aria-label={isAuthenticated ? 'Профиль' : 'Войти'}
            >
              <span>{isAuthenticated ? 'Профиль' : 'Войти'}</span>
              {isAuthenticated && getUnreadNotificationsCount() > 0 && (
                <span className="badge">{getUnreadNotificationsCount()}</span>
              )}
            </button>
            {isAuthenticated && (
              <button
                className="header-link header-link--logout"
                type="button"
                onClick={logout}
              >
                Выйти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;