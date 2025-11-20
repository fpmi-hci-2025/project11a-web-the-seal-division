import React from 'react';
import './HelpSection.css';

const HelpSection = () => {
  const handleConsultantClick = () => {
    // Заглушка для консультанта
    alert('Сервис консультанта скоро будет доступен!');
  };

  return (
    <section className="help-section">
      <span className="help-text">Нужна помощь?</span>
      <button className="consultant-btn" onClick={handleConsultantClick}>
        Консультант
      </button>
    </section>
  );
};

export default HelpSection;