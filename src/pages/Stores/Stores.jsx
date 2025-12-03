import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import './Stores.css';

const Stores = () => {
  return (
    <div className="stores-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Магазины' }
            ]}
          />
          <section className="stores-section">
            <h1 className="page-title">Наши магазины в Минске</h1>
            <div className="stores-content">
              <div className="store-item">
                <h2>Центральный магазин</h2>
                <p><strong>Адрес:</strong> пр. Независимости, 95, ТЦ «Столица», 2 этаж</p>
                <p><strong>Телефон:</strong> +375 (29) 123-45-67</p>
                <p><strong>Режим работы:</strong> ежедневно с 10:00 до 22:00</p>
              </div>
              <div className="store-item">
                <h2>Филиал на Победителей</h2>
                <p><strong>Адрес:</strong> пр. Победителей, 9, ТЦ «Галерея Минск», 3 этаж</p>
                <p><strong>Телефон:</strong> +375 (29) 123-45-68</p>
                <p><strong>Режим работы:</strong> ежедневно с 10:00 до 22:00</p>
              </div>
              <div className="store-item">
                <h2>Филиал на Немиге</h2>
                <p><strong>Адрес:</strong> ул. Немига, 3, ТЦ «Немига 3», 1 этаж</p>
                <p><strong>Телефон:</strong> +375 (29) 123-45-69</p>
                <p><strong>Режим работы:</strong> ежедневно с 10:00 до 22:00</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stores;

