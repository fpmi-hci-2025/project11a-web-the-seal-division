import React from 'react';
import './Carousel.css';

const Carousel = ({ children, currentSlide, totalSlides, onSlideChange }) => {
  const nextSlide = () => {
    onSlideChange((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    onSlideChange((currentSlide - 1 + totalSlides) % totalSlides);
  };

  if (totalSlides <= 1) {
    return (
      <div className="books-carousel">
        <div className="books-carousel__container">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="books-carousel">
      <div 
        className="books-carousel__container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children}
      </div>
      
      <button className="carousel-btn carousel-btn--prev" onClick={prevSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#11433D" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      
      <button className="carousel-btn carousel-btn--next" onClick={nextSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="#11433D" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="carousel-indicators">
        {Array.from({ length: totalSlides }, (_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => onSlideChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;