import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import BookCard from '../../components/books/BookCard/BookCard';
import { apiService } from '../../services/apiService';
import './Catalog.css';

const Catalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  const search = query.get('search') || '';
  const categoriesParam = query.get('categories') || '';
  const minPrice = query.get('minPrice');
  const maxPrice = query.get('maxPrice');
  const rating = query.get('rating');
  const inStock = query.get('inStock') === '1';
  const preOrder = query.get('preOrder') === '1';

  const activeCategories = categoriesParam
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllBooks();
        setAllBooks(
          Array.isArray(data)
            ? data.map((book) => ({
                id: book.id,
                title: book.title,
                author: book.author,
                price: book.price,
                rating: Number(book.rating) || 0,
                category: book.category?.name || book.category || 'other',
                image:
                  book.link ||
                  '/project11a-web-the-seal-division/assets/images/books/new1.png',
                publisher: book.publisher?.name || book.publisher || '',
                topic: book.category?.name || '',
                preorder: Boolean(book.preorder),
                inStock: true
              }))
            : []
        );
      } catch (e) {
        console.error('Error fetching books for catalog:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      if (activeCategories.length && !activeCategories.includes(book.category)) {
        return false;
      }

      const price = Number(book.price);
      if (minPrice && price < Number(minPrice)) return false;
      if (maxPrice && price > Number(maxPrice)) return false;

      if (rating && Number(book.rating) < Number(rating)) return false;

      if (inStock && !book.inStock) return false;
      if (preOrder && !book.preorder) return false;

      if (search.trim()) {
        const term = search.toLowerCase();
        const haystack = [
          book.title,
          book.author,
          book.topic,
          book.publisher
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(term)) return false;
      }

      return true;
    });
  }, [allBooks, activeCategories, maxPrice, minPrice, preOrder, rating, inStock, search]);

  const handleResetFilters = () => {
    navigate('/catalog');
  };

  return (
    <div className="catalog-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Каталог' }
            ]}
          />
          <section className="catalog-section">
            <h1 className="page-title">Каталог книг</h1>

            {loading && <div className="catalog-loading">Загрузка книг...</div>}
            {error && !filteredBooks.length && (
              <div className="catalog-error">Не удалось загрузить книги.</div>
            )}

            <div className="catalog-summary">
              <span>
                Найдено книг: <strong>{filteredBooks.length}</strong>
              </span>
              {(search || activeCategories.length || minPrice || maxPrice || rating || inStock || preOrder) && (
                <button className="catalog-reset-btn" onClick={handleResetFilters}>
                  Сбросить фильтры
                </button>
              )}
            </div>

            {filteredBooks.length === 0 ? (
              <div className="catalog-empty">
                <h2>Книги не найдены</h2>
                <p>Попробуйте изменить параметры поиска или сбросить фильтры.</p>
              </div>
            ) : (
              <div className="catalog-grid">
                {filteredBooks.map((book) => (
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

export default Catalog;