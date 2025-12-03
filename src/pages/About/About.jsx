import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'О нас' }
            ]}
          />
          <section className="about-section">
            <h1 className="page-title">О нас</h1>
            <div className="about-content">
              <p>
                «Мир Книг» — крупнейший книжный магазин в Минске. Мы предлагаем широкий ассортимент книг 
                различных жанров: от классической литературы до современных бестселлеров. Наша миссия — 
                сделать чтение доступным для всех.
              </p>
              <p>
                Мы работаем с 2010 года и за это время стали одним из самых популярных книжных магазинов 
                в Беларуси. Наш каталог насчитывает более 50 000 наименований книг на русском, белорусском 
                и английском языках.
              </p>
              <p>
                Мы гордимся тем, что помогаем нашим клиентам находить именно те книги, которые им нужны, 
                и делаем процесс покупки максимально удобным и приятным.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

