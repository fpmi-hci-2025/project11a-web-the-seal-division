import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../../../context/useBookContext';
import { formatPrice } from '../../../utils/helpers';
import './BookCard.css';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useBookContext();

  const isFavorite = state.favorites.some((favBook) => favBook.id === book.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: book.id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: book });
    }
  };

  const handleDetails = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/book/${book.id}`);
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
          <button className="buy-btn" onClick={handleDetails}>
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;