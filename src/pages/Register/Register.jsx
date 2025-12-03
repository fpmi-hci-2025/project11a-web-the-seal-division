import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordRepeat) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      register({ name, email, password, phone });
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Ошибка регистрации. Попробуйте ещё раз.');
    }
  };

  return (
    <div className="register-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Регистрация' }
            ]}
          />
          <section className="register-section">
            <h1 className="page-title">Регистрация</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form__field">
                <label htmlFor="name">Имя пользователя</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="auth-form__field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="auth-form__field">
                <label htmlFor="phone">Телефон (необязательно)</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+375..."
                />
              </div>
              <div className="auth-form__field">
                <label htmlFor="password">Пароль</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="auth-form__field">
                <label htmlFor="passwordRepeat">Повтор пароля</label>
                <input
                  id="passwordRepeat"
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  required
                />
              </div>
              {error && <div className="auth-form__error">{error}</div>}
              <button type="submit" className="auth-form__submit">
                Зарегистрироваться
              </button>
              <p className="auth-form__hint">
                Уже есть аккаунт?{' '}
                <Link to="/login" className="auth-form__link">
                  Войти
                </Link>
              </p>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;


