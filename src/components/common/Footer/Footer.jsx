import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">Мир Книг</div>
        <div className="footer__links">
          <div className="footer__links-column">
            <a href="#">О нас</a>
            <a href="#">Магазины</a>
            <a href="#">Доставка</a>
          </div>
          <div className="footer__links-column">
            <a href="#">Покупателям</a>
            <a href="#">Партнёрам</a>
            <a href="#">Писателям</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;