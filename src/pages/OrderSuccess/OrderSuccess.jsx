import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderNumber = location.state?.orderNumber || 'N/A';

  return (
    <div className="order-success-page">
      <Header />
      <main className="main">
        <div className="container">
          <section className="order-success-section">
            <div className="success-content">
              <div className="success-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#28a745" />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              <h1 className="success-title">Заказ успешно оформлен!</h1>
              
              <p className="success-message">
                Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.
              </p>
              
              <div className="order-info">
                <p className="order-number">
                  Номер заказа: <strong>{orderNumber}</strong>
                </p>
              </div>
              
              <div className="success-actions">
                <Link to="/catalog" className="continue-shopping-btn">
                  Продолжить покупки
                </Link>
                <button 
                  onClick={() => navigate('/profile')}
                  className="view-orders-btn"
                >
                  Мои заказы
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;

