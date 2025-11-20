import React from 'react';
import { useBookContext } from '../../context/BookContext';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import { formatPrice } from '../../utils/helpers';
import './Cart.css';

const Cart = () => {
  const { state, dispatch } = useBookContext();

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: bookId });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { id: bookId, quantity: newQuantity } });
    }
  };

  const removeFromCart = (bookId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: bookId });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <Header />
      <main className="main">
        <div className="container">
          <section className="cart-section">
            <h1 className="page-title">Корзина</h1>
            {state.cart.length === 0 ? (
              <div className="empty-state">
                <h2>Корзина пуста</h2>
                <p>Добавьте книги, чтобы сделать заказ</p>
              </div>
            ) : (
              <div className="cart-content">
                <div className="cart-items">
                  {state.cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} className="cart-item__image" />
                      <div className="cart-item__info">
                        <h3 className="cart-item__title">{item.title}</h3>
                        <p className="cart-item__author">{item.author}</p>
                        <p className="cart-item__price">{formatPrice(item.price)}</p>
                      </div>
                      <div className="cart-item__actions">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <h3>Итого</h3>
                  <div className="summary-row">
                    <span>Товары ({getTotalItems()})</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="summary-row">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="summary-total">
                    <span>Общая сумма</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <button className="checkout-btn">
                    Оформить заказ
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;