import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">Мир Книг</div>
        <div className="footer__links">
          <div className="footer__links-column">
            <button onClick={() => handleLinkClick('/about')} className="footer__link">
              О нас
            </button>
            <button onClick={() => handleLinkClick('/stores')} className="footer__link">
              Магазины
            </button>
            <button onClick={() => handleLinkClick('/delivery')} className="footer__link">
              Доставка
            </button>
          </div>
          <div className="footer__links-column">
            <button onClick={() => handleLinkClick('/buyers')} className="footer__link">
              Покупателям
            </button>
            <button onClick={() => handleLinkClick('/partners')} className="footer__link">
              Партнёрам
            </button>
            <button onClick={() => handleLinkClick('/writers')} className="footer__link">
              Писателям
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;