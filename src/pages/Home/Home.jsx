import React from 'react';
import Header from '../../components/common/Header/Header';
import SearchFilter from '../../components/common/SearchFilter/SearchFilter';
import HelpSection from '../../components/common/HelpSection/HelpSection';
import SalesSection from '../../components/common/SalesSection/SalesSection';
import BooksSection from '../../components/books/BooksSection/BooksSection';
import Footer from '../../components/common/Footer/Footer';
import { useCategories } from '../../hooks/api/useCategories';
import './Home.css';

const Home = () => {
  const { categories, loading, error } = useCategories();

  return (
    <div className="home">
      <Header />
      <main className="main">
        <div className="container">
          <section className="hero">
            <h1 className="hero__title">Мир Книг</h1>
          </section>

          <SearchFilter />
          <HelpSection />
          <SalesSection />
          
          <section className="books-main">
            <h2 className="section-title">Книги</h2>

            {loading && <div className="home-loading">Загрузка категорий...</div>}
            {error && !categories.length && (
              <div className="home-error">Не удалось загрузить категории.</div>
            )}

            {categories.map((category) => (
              <BooksSection
                key={category.id}
                title={category.name}
                category={category.name}
              />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;