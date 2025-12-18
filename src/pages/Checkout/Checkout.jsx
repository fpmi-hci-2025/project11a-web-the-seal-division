import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useBookContext } from '../../context/useBookContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useBookContext();
  const { addOrder } = useAuth();

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const total = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.cart]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!state.cart.length) {
      setError('Корзина пуста. Добавьте книги перед оплатой.');
      return;
    }

    if (!name || !cardNumber || !expiry || !cvv || !address) {
      setError('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    const order = {
      total,
      address,
      paymentMethod: 'Карта',
      status: 'новый',
      items: state.cart
    };

    try {
      await addOrder(order);
      dispatch({ type: 'CLEAR_CART' });
      setSuccess('Оплата успешно выполнена. Заказ создан.');
      setTimeout(() => {
        navigate('/profile');
      }, 800);
    } catch (err) {
      console.error('Failed to create order:', err);
      setError('Не удалось оформить заказ. Попробуйте позже.');
    }
  };

  return (
    <div className="checkout-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Корзина', path: '/cart' },
              { label: 'Оплата' }
            ]}
          />
          <section className="checkout-section">
            <h1 className="page-title">Оплата заказа</h1>

            <div className="checkout-layout">
              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="checkout-form__field">
                  <label htmlFor="name">Имя на карте</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout-form__field">
                  <label htmlFor="card">Номер карты</label>
                  <input
                    id="card"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="0000 0000 0000 0000"
                    required
                  />
                </div>
                <div className="checkout-form__row">
                  <div className="checkout-form__field">
                    <label htmlFor="expiry">Дата действия</label>
                    <input
                      id="expiry"
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="checkout-form__field">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      id="cvv"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="checkout-form__field">
                  <label htmlFor="address">Адрес доставки</label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
                {error && <div className="checkout-form__error">{error}</div>}
                {success && <div className="checkout-form__success">{success}</div>}
                <button type="submit" className="checkout-form__submit">
                  Оплатить {formatPrice(total)}
                </button>
              </form>

              <aside className="checkout-summary">
                <h2>Ваш заказ</h2>
                {state.cart.length === 0 ? (
                  <p className="checkout-summary__empty">Корзина пуста.</p>
                ) : (
                  <>
                    <ul className="checkout-summary__list">
                      {state.cart.map((item) => (
                        <li key={item.id} className="checkout-summary__item">
                          <span>
                            {item.title} × {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="checkout-summary__total">
                      <span>Итого</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </>
                )}
              </aside>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;


