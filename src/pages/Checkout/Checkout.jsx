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

  // Валидация номера карты
  const validateCardNumber = (card) => {
    const cleaned = card.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned);
  };

  // Валидация даты (MM/YY)
  const validateExpiry = (exp) => {
    const match = exp.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
    return true;
  };

  // Валидация CVV (строго 3 цифры)
  const validateCVV = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };

  // Валидация адреса
  const validateAddress = (addr) => {
    return addr.trim().length >= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!state.cart.length) {
      setError('Корзина пуста. Добавьте книги перед оплатой.');
      return;
    }

    // Валидация всех полей
    if (!name || !name.trim()) {
      setError('Пожалуйста, введите имя на карте.');
      return;
    }

    if (!cardNumber || !validateCardNumber(cardNumber)) {
      setError('Пожалуйста, введите корректный номер карты (13-19 цифр).');
      return;
    }

    if (!expiry || !validateExpiry(expiry)) {
      setError('Пожалуйста, введите корректную дату действия карты (MM/YY).');
      return;
    }

    if (!cvv || !validateCVV(cvv)) {
      setError('Пожалуйста, введите корректный CVV код (3 цифры).');
      return;
    }

    if (!address || !validateAddress(address)) {
      setError('Пожалуйста, введите полный адрес доставки (минимум 10 символов).');
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
      // Отправляем событие для обновления заказов в Profile
      window.dispatchEvent(new CustomEvent('orderCreated', { detail: { timestamp: Date.now() } }));
      // Переходим на страницу профиля и даем время на обработку события
      setTimeout(() => {
        navigate('/profile');
      }, 300);
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
                    onChange={(e) => {
                      // Форматируем номер карты с пробелами
                      const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setCardNumber(formatted);
                    }}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
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
                      onChange={(e) => {
                        // Форматируем дату MM/YY
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.substring(0, 2) + '/' + value.substring(2, 4);
                        }
                        setExpiry(value);
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="checkout-form__field">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      id="cvv"
                      type="password"
                      value={cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setCvv(value);
                      }}
                      placeholder="123"
                      maxLength={3}
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


