import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../../context/useBookContext';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import { formatPrice, validateEmail, validatePhone, formatPhone } from '../../utils/helpers';
import './Order.css';

const Order = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useBookContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comments: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Автоформатирование телефона
    if (name === 'phone') {
      const formatted = formatPhone(value);
      setFormData(prev => ({
        ...prev,
        phone: formatted
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно для заполнения';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна для заполнения';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Некорректный email адрес';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен для заполнения';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Некорректный номер телефона';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Адрес обязателен для заполнения';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Город обязателен для заполнения';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Почтовый индекс обязателен для заполнения';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (state.cart.length === 0) {
      alert('Корзина пуста. Добавьте товары перед оформлением заказа.');
      navigate('/cart');
      return;
    }

    setIsSubmitting(true);

    // Имитация отправки заказа (без API)
    setTimeout(() => {
      const orderData = {
        ...formData,
        items: state.cart,
        total: getTotalPrice(),
        orderDate: new Date().toISOString(),
        orderNumber: `ORD-${Date.now()}`,
        status: 'новый'
      };

      // Сохранение заказа в localStorage (для демонстрации)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Очистка корзины
      dispatch({ type: 'CLEAR_CART' });

      setIsSubmitting(false);
      
      // Переход на страницу успешного заказа
      navigate('/order/success', { state: { orderNumber: orderData.orderNumber } });
    }, 1500);
  };

  if (state.cart.length === 0) {
    return (
      <div className="order-page">
        <Header />
        <main className="main">
          <div className="container">
            <section className="order-section">
              <div className="empty-cart-message">
                <h2>Корзина пуста</h2>
                <p>Добавьте товары в корзину перед оформлением заказа</p>
                <button onClick={() => navigate('/catalog')} className="back-to-catalog-btn">
                  Перейти в каталог
                </button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="order-page">
      <Header />
      <main className="main">
        <div className="container">
          <section className="order-section">
            <h1 className="page-title">Оформление заказа</h1>
            
            <div className="order-content">
              <form className="order-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h2 className="form-section__title">Контактная информация</h2>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Имя *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Фамилия *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Телефон *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+375 (XX) XXX-XX-XX"
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="form-section__title">Адрес доставки</h2>
                  
                  <div className="form-group">
                    <label htmlFor="address">Адрес *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">Город *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? 'error' : ''}
                      />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="postalCode">Почтовый индекс *</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={errors.postalCode ? 'error' : ''}
                      />
                      {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="form-section__title">Способ доставки</h2>
                  
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="courier"
                        checked={formData.deliveryMethod === 'courier'}
                        onChange={handleInputChange}
                      />
                      <span>Курьерская доставка (бесплатно)</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={formData.deliveryMethod === 'pickup'}
                        onChange={handleInputChange}
                      />
                      <span>Самовывоз (бесплатно)</span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="form-section__title">Способ оплаты</h2>
                  
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <span>Банковская карта</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                      />
                      <span>Наличными при получении</span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="form-section__title">Комментарий к заказу</h2>
                  
                  <div className="form-group">
                    <textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Дополнительная информация для доставки..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-order-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                </button>
              </form>

              <div className="order-summary">
                <h2 className="summary-title">Ваш заказ</h2>
                
                <div className="summary-items">
                  {state.cart.map(item => (
                    <div key={item.id} className="summary-item">
                      <div className="summary-item__info">
                        <h4>{item.title}</h4>
                        <p>{item.author}</p>
                        <span className="summary-item__quantity">x{item.quantity}</span>
                      </div>
                      <div className="summary-item__price">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-totals">
                  <div className="summary-row">
                    <span>Товары ({getTotalItems()})</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="summary-row">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="summary-total">
                    <span>Итого</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Order;

