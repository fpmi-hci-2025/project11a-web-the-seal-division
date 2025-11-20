import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import './LogIn.css';

const LogIn = () => {
  return (
    <div className="login-page">
      <Header />
      <main className="main">
        <div className="container">
          <section className="login-section">
            <h1 className="page-title">Вход</h1>
            <div className="coming-soon">
              <h2>Страница в разработке</h2>
              <p>Скоро здесь появится форма входа</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LogIn;