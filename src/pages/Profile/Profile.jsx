import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <Header />
      <main className="main">
        <div className="container">
          <section className="profile-section">
            <h1 className="page-title">Профиль</h1>
            <div className="coming-soon">
              <h2>Страница в разработке</h2>
              <p>Скоро здесь появится ваш профиль</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;