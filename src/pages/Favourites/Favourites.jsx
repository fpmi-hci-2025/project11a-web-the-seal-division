import React from 'react';
import { useBookContext } from '../../context/BookContext';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import BookCard from '../../components/books/BookCard/BookCard';
import './Favourites.css';

const Favourites = () => {
  const { state } = useBookContext();

  return (
    <div className="favourites-page">
      <Header />
      <main className="main">
        <div className="container">
          <section className="favourites-section">
            <h1 className="page-title">Избранное</h1>
            {state.favorites.length === 0 ? (
              <div className="empty-state">
                <h2>В избранном пока ничего нет</h2>
                <p>Добавляйте книги, которые хотите сохранить на потом</p>
              </div>
            ) : (
              <div className="favourites-grid">
                {state.favorites.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favourites;