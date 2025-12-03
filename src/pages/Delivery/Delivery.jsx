import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import './Delivery.css';

const Delivery = () => {
  return (
    <div className="delivery-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Доставка' }
            ]}
          />
          <section className="delivery-section">
            <h1 className="page-title">Доставка</h1>
            <div className="delivery-content">
              <div className="delivery-item">
                <h2>Доставка по Минску</h2>
                <p>Мы осуществляем доставку по всему Минску в течение 1-2 рабочих дней.</p>
                <p><strong>Стоимость доставки:</strong> от 5 рублей</p>
                <p><strong>Бесплатная доставка:</strong> при заказе от 50 рублей</p>
              </div>
              <div className="delivery-item">
                <h2>Доставка по Беларуси</h2>
                <p>Доставляем книги во все города Беларуси через службу доставки.</p>
                <p><strong>Стоимость доставки:</strong> от 10 рублей</p>
                <p><strong>Срок доставки:</strong> 2-3 рабочих дня</p>
              </div>
              <div className="delivery-item">
                <h2>Самовывоз</h2>
                <p>Вы можете забрать заказ самостоятельно в любом из наших магазинов.</p>
                <p><strong>Стоимость:</strong> бесплатно</p>
                <p><strong>Срок готовности:</strong> в течение 1 рабочего дня после оформления заказа</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Delivery;

