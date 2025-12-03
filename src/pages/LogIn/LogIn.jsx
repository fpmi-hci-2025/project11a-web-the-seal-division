import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';
import './LogIn.css';

const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = login({ email, password });
      if (user.role === 'admin') {
        navigate('/admin/add-book');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Ошибка входа. Попробуйте ещё раз.');
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Вход' }
            ]}
          />
          <section className="login-section">
            <h1 className="page-title">Вход</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form__field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mir-knig.by"
                  required
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
              {error && <div className="auth-form__error">{error}</div>}
              <button type="submit" className="auth-form__submit">
                Войти
              </button>
              <p className="auth-form__hint">
                Нет аккаунта?{' '}
                <Link to="/register" className="auth-form__link">
                  Зарегистрироваться
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

export default LogIn;