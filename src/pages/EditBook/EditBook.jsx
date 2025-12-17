import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import { apiService } from '../../services/apiService';
import { formatPrice } from '../../utils/helpers';
import './EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    rating: '',
    category: 'new',
    description: '',
    year: '',
    pages: '',
    publisher: '',
    isbn: '',
    inStock: true,
    stockCount: ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      apiService.getBookById(id)
        .then((data) => {
          if (!data) return;

          const mappedBook = {
            id: data.id,
            title: data.title,
            author: data.author,
            price: data.price,
            rating: Number(data.rating) || 0,
            category: data.category?.name || data.category || 'new',
            description: data.description || '',
            year: data.available_date || '',
            pages: data.pages || '',
            publisher: data.publisher?.name || data.publisher || '',
            isbn: data.isbn || '',
            inStock: true,
            stockCount: ''
          };

          setBook(mappedBook);
          setFormData({
            title: mappedBook.title || '',
            author: mappedBook.author || '',
            price: mappedBook.price || '',
            rating: mappedBook.rating || '',
            category: mappedBook.category || 'new',
            description: mappedBook.description || '',
            year: mappedBook.year || '',
            pages: mappedBook.pages || '',
            publisher: mappedBook.publisher || '',
            isbn: mappedBook.isbn || '',
            inStock: mappedBook.inStock !== undefined ? mappedBook.inStock : true,
            stockCount: mappedBook.stockCount || ''
          });
        })
        .catch((e) => {
          console.error('Error fetching book for edit:', e);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Автор обязателен';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Цена должна быть больше 0';
    }

    if (!formData.rating || parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      newErrors.rating = 'Рейтинг должен быть от 0 до 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    // Имитация сохранения (без реального обновления API)
    setTimeout(() => {
      const updatedBook = {
        ...book,
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        year: formData.year ? parseInt(formData.year, 10) : null,
        pages: formData.pages ? parseInt(formData.pages, 10) : null,
        stockCount: formData.stockCount ? parseInt(formData.stockCount, 10) : 0
      };

      setIsSaving(false);
      alert('Книга успешно обновлена!');
      navigate(`/book/${id}`);
    }, 1000);
  };

  if (!book) {
    return (
      <div className="edit-book-page">
        <Header />
        <main className="main">
          <div className="container">
            <section className="edit-book-section">
              <div className="book-not-found">
                <h2>Книга не найдена</h2>
                <button onClick={() => navigate('/catalog')} className="back-btn">
                  Вернуться в каталог
                </button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="edit-book-page">
      <Header />
      <main className="main">
        <div className="container">
          <section className="edit-book-section">
            <div className="edit-book-header">
              <h1 className="page-title">Редактирование книги</h1>
              <button onClick={() => navigate(`/book/${id}`)} className="back-link">
                ← Назад к книге
              </button>
            </div>

            <form className="edit-book-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2 className="form-section__title">Основная информация</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Название *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="author">Автор *</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className={errors.author ? 'error' : ''}
                    />
                    {errors.author && <span className="error-message">{errors.author}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Категория</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="new">Новинки</option>
                      <option value="classic">Классика</option>
                      <option value="fantasy">Фантастика</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="rating">Рейтинг *</label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className={errors.rating ? 'error' : ''}
                    />
                    {errors.rating && <span className="error-message">{errors.rating}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Описание</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-section">
                <h2 className="form-section__title">Цена и наличие</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Цена (BYN) *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={errors.price ? 'error' : ''}
                    />
                    {errors.price && <span className="error-message">{errors.price}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="stockCount">Количество на складе</label>
                    <input
                      type="number"
                      id="stockCount"
                      name="stockCount"
                      min="0"
                      value={formData.stockCount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                    />
                    <span>В наличии</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h2 className="form-section__title">Дополнительная информация</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="year">Год издания</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      min="1000"
                      max={new Date().getFullYear()}
                      value={formData.year}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pages">Количество страниц</label>
                    <input
                      type="number"
                      id="pages"
                      name="pages"
                      min="1"
                      value={formData.pages}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="publisher">Издательство</label>
                    <input
                      type="text"
                      id="publisher"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate(`/book/${id}`)}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  disabled={isSaving}
                >
                  {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditBook;

