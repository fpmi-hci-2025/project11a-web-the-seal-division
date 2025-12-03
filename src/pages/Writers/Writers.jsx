import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import './Writers.css';

const Writers = () => {
  return (
    <div className="writers-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Писателям' }
            ]}
          />
          <section className="writers-section">
            <h1 className="page-title">Писателям</h1>
            <div className="writers-content">
              <p>
                Если вы автор и хотите, чтобы ваши книги появились в нашем магазине, отправьте информацию 
                о вашем произведении на указанные контакты. Мы рассмотрим каждое предложение и свяжемся с 
                вами в течение 5 рабочих дней.
              </p>
              <div className="writers-contact">
                <h2>Контакты для авторов</h2>
                <p><strong>Email:</strong> writers@mir-knig.by</p>
                <p><strong>Телефон:</strong> +375 (29) 123-45-67</p>
                <p><strong>Режим работы:</strong> Пн-Пт с 9:00 до 18:00</p>
              </div>
              <div className="writers-info">
                <h2>Что нужно предоставить</h2>
                <ul>
                  <li>Название произведения</li>
                  <li>Краткое описание (аннотация)</li>
                  <li>Информацию об авторе</li>
                  <li>Обложку книги (если есть)</li>
                  <li>Контактные данные для связи</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Writers;

