import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useBookContext } from '../../context/useBookContext';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';
import { formatPrice } from '../../utils/helpers';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useBookContext();
  const { user, subscribeToPublisher } = useAuth();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [subscribeError, setSubscribeError] = useState('');
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await apiService.getBookById(id);
        setBook({
          id: data.id,
          title: data.title,
          author: data.author,
          price: data.price,
          rating: Number(data.rating) || 0,
          category: data.category?.name || data.category || 'other',
          image:
            data.link ||
            '/project11a-web-the-seal-division/assets/images/books/new1.png',
          publisher: data.publisher?.name || data.publisher || '',
          topic: data.category?.name || '',
          preorder: Boolean(data.preorder),
          inStock: true
        });
      } catch (e) {
        console.error('Error fetching book details:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const bookId = book ? book.id : null;
  const reviews = (bookId && state.reviews[bookId]) || [];

  const isInCart = book
    ? state.cart.some((item) => String(item.id) === String(book.id))
    : false;

  const isFavorite = book
    ? state.favorites.some((fav) => String(fav.id) === String(book.id))
    : false;

  if (loading) {
    return (
      <div className="book-details-page">
        <Header />
        <main className="main">
          <div className="container">
            <section className="book-details-section">
              <h1 className="page-title">Загрузка книги...</h1>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book || error) {
    return (
      <div className="book-details-page">
        <Header />
        <main className="main">
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Главная', path: '/' },
                { label: 'Каталог', path: '/catalog' },
                { label: 'Книга не найдена' }
              ]}
            />
            <section className="book-details-section">
              <h1 className="page-title">Книга не найдена</h1>
              <p>Такой книги нет в каталоге.</p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBuy = () => {
    if (!book) return;
    if (isInCart) {
      navigate('/cart');
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: book });
    }
  };

  const handlePreorder = () => {
    if (!book) return;
    dispatch({ type: 'ADD_TO_CART', payload: { ...book, preorder: true } });
  };

  const handleToggleFavorite = () => {
    if (!book) return;
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: book.id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: book });
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!user || !bookId || !reviewText.trim()) return;

    const newReview = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      rating: Number(reviewRating),
      text: reviewText.trim(),
      date: new Date().toISOString()
    };

    dispatch({
      type: 'ADD_REVIEW',
      payload: { bookId, review: newReview }
    });

    setReviewText('');
    setReviewRating(5);
  };

  const handleDeleteReview = (reviewId) => {
    if (!user || !bookId) return;
    dispatch({
      type: 'DELETE_REVIEW',
      payload: { bookId, reviewId }
    });
  };

  const handleSubscribe = () => {
    if (!book) return;
    if (!user) {
      setSubscribeError('Для подписки необходимо войти в профиль');
      setSubscribeMessage('');
      setTimeout(() => setSubscribeError(''), 3000);
      return;
    }
    subscribeToPublisher(book.publisher);
    setSubscribeMessage(`Вы подписались на новости издательства ${book.publisher}.`);
    setSubscribeError('');
    setTimeout(() => setSubscribeMessage(''), 2000);
  };

  return (
    <div className="book-details-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Каталог', path: '/catalog' },
              { label: book.title }
            ]}
          />
          <section className="book-details-section">
            <div className="book-details">
              <div className="book-details__image-wrap">
                <img src={book.image} alt={book.title} className="book-details__image" />
              </div>
              <div className="book-details__info">
                <h1 className="book-details__title">{book.title}</h1>
                <p className="book-details__author">{book.author}</p>
                <p className="book-details__meta">
                  Издательство: <strong>{book.publisher}</strong>
                </p>
                <p className="book-details__meta">
                  Тематика: <strong>{book.topic}</strong>
                </p>
                <p className="book-details__price">
                  {book.oldPrice && Number(book.oldPrice) > Number(book.price) ? (
                    <>
                      <span className="book-details__price-old">
                        {formatPrice(Number(book.oldPrice))}
                      </span>
                      <span className="book-details__price-new">
                        {formatPrice(Number(book.price))}
                      </span>
                    </>
                  ) : (
                    formatPrice(Number(book.price))
                  )}
                </p>
                <p className="book-details__availability">
                  {book.inStock
                    ? 'В наличии'
                    : book.preorder
                      ? 'Доступно для предзаказа'
                      : 'Нет в наличии'}
                </p>
                <div className="book-details__actions">
                  <button 
                    className={`book-details__btn ${isInCart ? 'book-details__btn--in-cart' : ''}`}
                    onClick={handleBuy}
                  >
                    {isInCart ? 'В корзине' : 'В корзину'}
                  </button>
                  {book.preorder && (
                    <button
                      type="button"
                      className="book-details__btn book-details__btn--secondary"
                      onClick={handlePreorder}
                    >
                      Предзаказ
                    </button>
                  )}
                </div>
                <div className="book-details__description">
                  <h2>Описание</h2>
                  <p>
                    Это демонстрационное описание книги «{book.title}». В реальном приложении сюда
                    будет подставляться текст из базы данных или API.
                  </p>
                </div>
                <div className="book-details__subscribe">
                  <h3>Подписка на новости издательства</h3>
                  <button type="button" className="book-details__btn" onClick={handleSubscribe}>
                    Подписаться на издательство
                  </button>
                  {subscribeMessage && (
                    <div className="subscribe-form__success">{subscribeMessage}</div>
                  )}
                  {subscribeError && (
                    <div className="subscribe-form__error">{subscribeError}</div>
                  )}
                </div>

                <div className="book-details__actions book-details__actions--secondary">
                  <button
                    type="button"
                    className="book-details__btn book-details__btn--secondary"
                    onClick={handleToggleFavorite}
                  >
                    {isFavorite ? 'В избранном' : 'В избранное'}
                  </button>
                </div>

                <div className="book-details__reviews">
                  <h2>Отзывы</h2>
                  {reviews.length === 0 ? (
                    <p className="reviews-empty">Отзывов пока нет. Будьте первым!</p>
                  ) : (
                    <ul className="reviews-list">
                      {reviews.map((r) => (
                        <li key={r.id} className="review-item">
                          <div className="review-header">
                            <span className="review-author">{r.userName}</span>
                            <span className="review-rating">{'★'.repeat(r.rating)}</span>
                            <span className="review-date">
                              {new Date(r.date).toLocaleString('ru-RU')}
                            </span>
                            {user && r.userId === user.id && (
                              <button
                                type="button"
                                className="review-delete"
                                onClick={() => handleDeleteReview(r.id)}
                              >
                                Удалить
                              </button>
                            )}
                          </div>
                          <p className="review-text">{r.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}

                  {user ? (
                    <form className="review-form" onSubmit={handleAddReview}>
                      <div className="review-form__field">
                        <label htmlFor="rating">Оценка:</label>
                        <select
                          id="rating"
                          value={reviewRating}
                          onChange={(e) => setReviewRating(e.target.value)}
                        >
                          <option value={5}>5</option>
                          <option value={4}>4</option>
                          <option value={3}>3</option>
                          <option value={2}>2</option>
                          <option value={1}>1</option>
                        </select>
                      </div>
                      <div className="review-form__field">
                        <label htmlFor="reviewText">Ваш отзыв:</label>
                        <textarea
                          id="reviewText"
                          rows="3"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="book-details__btn">
                        Оставить отзыв
                      </button>
                    </form>
                  ) : (
                    <p className="reviews-login-hint">
                      Чтобы оставить отзыв, войдите в личный кабинет.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetails;