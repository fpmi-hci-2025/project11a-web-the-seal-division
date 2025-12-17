import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../../hooks/api/useBooks';
import BookCard from '../BookCard/BookCard';
import Carousel from '../../ui/Carousel/Carousel';
import './BooksSection.css';

const BooksSection = ({ title, category }) => {
  const navigate = useNavigate();
  const { books, loading, error } = useBooks(category);
  const [currentSlide, setCurrentSlide] = useState(0);

  const booksPerSlide = 2;
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  const slides = Array.from({ length: totalSlides }, (_, index) => 
    books.slice(index * booksPerSlide, (index + 1) * booksPerSlide)
  );

  const handleAllBooks = () => {
    // Переход в каталог с фильтром по категории
    navigate(`/catalog?categories=${category}`);
  };

  if (loading) return <div className="loading">Загрузка книг...</div>;
  if (error) console.error('Error loading books:', error);

  return (
    <section className="books-section">
      <h3 className="books-section__title">{title}</h3>
      
      {books.length > 0 ? (
        <Carousel
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onSlideChange={setCurrentSlide}
        >
          {slides.map((slideBooks, index) => (
            <div key={index} className="books-slide">
              {slideBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="no-books">Книги не найдены</div>
      )}

      <button className="all-books-btn" onClick={handleAllBooks}>
        Все книги
      </button>
    </section>
  );
};

export default BooksSection;