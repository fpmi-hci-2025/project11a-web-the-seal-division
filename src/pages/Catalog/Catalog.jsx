import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import BookCard from '../../components/books/BookCard/BookCard';
import { apiService } from '../../services/apiService';
import { useCategories } from '../../hooks/api/useCategories';
import './Catalog.css';

const Catalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categories } = useCategories();

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
  
  // Используем названия категорий напрямую из API
  const activeCategoryNames = activeCategories;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllBooks();
        setAllBooks(
          Array.isArray(data)
            ? data.map((book) => {
                const oldPrice = book.price;
                const discountPercentage = parseFloat(book.discount?.percentage) || 0;
                const newPrice = discountPercentage > 0 
                  ? oldPrice * (1 - discountPercentage / 100.0) 
                  : oldPrice;

                return {
                  id: book.id,
                  title: book.title,
                  author: book.author,
                  price: newPrice,
                  oldPrice: discountPercentage > 0 ? oldPrice : null,
                  discount: discountPercentage,
                  rating: Number(book.rating) || 0,
                  category: book.category?.name || book.category || 'other',
                  image:
                    book.link ||
                    '/project11a-web-the-seal-division/assets/images/books/new1.png',
                  publisher: book.publisher?.name || book.publisher || '',
                  topic: book.category?.name || '',
                  preorder: Boolean(book.preorder),
                  availableDate: book.available_date || null,
                  inStock: true
                };
              })
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

    // Обновляем книги при событии обновления
    const handleBooksUpdated = () => {
      fetchAll();
    };
    window.addEventListener('booksUpdated', handleBooksUpdated);
    return () => {
      window.removeEventListener('booksUpdated', handleBooksUpdated);
    };
  }, []);

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      // Фильтрация по категориям - используем названия категорий напрямую из API
      if (activeCategoryNames.length > 0) {
        const bookCategory = book.category || '';
        const matchesCategory = activeCategoryNames.some((catName) => {
          // Сравниваем по точному совпадению или по частичному совпадению (без учета регистра)
          return bookCategory.toLowerCase() === catName.toLowerCase() || 
                 bookCategory.toLowerCase().includes(catName.toLowerCase()) ||
                 catName.toLowerCase().includes(bookCategory.toLowerCase());
        });
        if (!matchesCategory) {
          return false;
        }
      }

      const price = Number(book.price);
      if (minPrice && price < Number(minPrice)) return false;
      if (maxPrice && price > Number(maxPrice)) return false;

      if (rating && Number(book.rating) < Number(rating)) return false;

      // Фильтрация по наличию
      // Если выбраны ОБА фильтра - показываем все книги (не фильтруем)
      // Если выбран только "В наличии" - показываем только те, что не на предзаказе
      // Если выбран только "Предзаказ" - показываем только те, что на предзаказе
      if (inStock && !preOrder) {
        // Только "В наличии" выбрано - исключаем предзаказы
        if (book.preorder) return false;
      } else if (preOrder && !inStock) {
        // Только "Предзаказ" выбран - показываем только предзаказы
        if (!book.preorder) return false;
      }
      // Если выбраны оба или ничего не выбрано - показываем все книги

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
  }, [allBooks, activeCategories, activeCategoryNames, maxPrice, minPrice, preOrder, rating, inStock, search]);

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