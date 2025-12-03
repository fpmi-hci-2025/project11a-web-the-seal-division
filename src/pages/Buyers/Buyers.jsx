import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import './Buyers.css';

const Buyers = () => {
  return (
    <div className="buyers-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Покупателям' }
            ]}
          />
          <section className="buyers-section">
            <h1 className="page-title">Покупателям</h1>
            <div className="buyers-content">
              <div className="buyers-item">
                <h2>Программа лояльности</h2>
                <p>
                  У нас действует программа лояльности для постоянных покупателей. При покупке от 100 рублей 
                  вы получаете скидку 5%. Также мы регулярно проводим акции и распродажи. Следите за новостями 
                  на нашем сайте!
                </p>
              </div>
              <div className="buyers-item">
                <h2>Возврат и обмен</h2>
                <p>
                  Вы можете вернуть или обменять книгу в течение 14 дней с момента покупки при условии, 
                  что товар не был в употреблении и сохранены его товарный вид и потребительские свойства.
                </p>
              </div>
              <div className="buyers-item">
                <h2>Способы оплаты</h2>
                <p>Мы принимаем оплату наличными, банковскими картами, а также через систему электронных платежей.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Buyers;

