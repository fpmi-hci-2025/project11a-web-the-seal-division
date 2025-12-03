import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import './Partners.css';

const Partners = () => {
  return (
    <div className="partners-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Партнёрам' }
            ]}
          />
          <section className="partners-section">
            <h1 className="page-title">Партнёрам</h1>
            <div className="partners-content">
              <p>
                Мы открыты к сотрудничеству с издательствами, авторами и другими книжными магазинами. 
                Для обсуждения условий партнёрства свяжитесь с нами.
              </p>
              <div className="partners-contact">
                <h2>Контакты для партнёров</h2>
                <p><strong>Email:</strong> partners@mir-knig.by</p>
                <p><strong>Телефон:</strong> +375 (29) 123-45-67</p>
                <p><strong>Режим работы:</strong> Пн-Пт с 9:00 до 18:00</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;

