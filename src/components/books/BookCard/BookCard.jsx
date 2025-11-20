import React, { useState } from 'react';
import { useBookContext } from '../../../context/BookContext';
import { formatPrice } from '../../../utils/helpers';
import './BookCard.css';

const BookCard = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { dispatch } = useBookContext();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: book.id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: book });
    }
    setIsFavorite(!isFavorite);
  };

  const handleBuy = () => {
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="star">
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="book-card">
      <div className="book-card__image-container">
        <img src={book.image} alt={book.title} className="book-card__image" />
      </div>
      <button 
        className={`book-card__bookmark ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteToggle}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#11433D" strokeWidth="2">
          <path 
            d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" 
            fill={isFavorite ? "#11433D" : "none"} 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="book-card__info">
        <h4 className="book-card__title">{book.title}</h4>
        <p className="book-card__author">{book.author}</p>
        <div className="book-card__price">{formatPrice(book.price)}</div>
        <div className="book-card__rating">
          {renderStars(book.rating)}
        </div>
        <div className="book-card__actions">
          <button className="buy-btn" onClick={handleBuy}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;