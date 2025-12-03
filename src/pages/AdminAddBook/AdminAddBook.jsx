import React, { useState } from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useBookContext } from '../../context/useBookContext';
import { useAuth } from '../../context/AuthContext';
import './AdminAddBook.css';

const AdminAddBook = () => {
  const { state, dispatch } = useBookContext();
  const { user, addNotification } = useAuth();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('new');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [preorder, setPreorder] = useState(false);
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [language, setLanguage] = useState('Русский');
  const [inStock, setInStock] = useState('0');
  const [coverImage, setCoverImage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [topic, setTopic] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now(),
      title,
      author,
      isbn: isbn || null,
      publication_date: publicationDate || null,
      price: Number(price),
      description: description || '',
      page_count: pageCount ? Number(pageCount) : null,
      preorder,
      availability_date: availabilityDate || null,
      language: language || 'Русский',
      in_stock: inStock ? Number(inStock) : 0,
      cover_image: coverImage || null,
      category,
      publisher: publisher || 'Мир Книг',
      topic: topic || 'Разное',
      rating: 5,
      image: coverImage || '/project11a-web-the-seal-division/assets/images/books/new1.png'
    };

    dispatch({
      type: 'SET_BOOKS',
      payload: [...state.books, newBook]
    });

    if (user && user.subscriptions && user.subscriptions.includes(newBook.publisher)) {
      addNotification({
        id: Date.now(),
        text: `Новая книга от издательства ${newBook.publisher}: «${newBook.title}».`,
        date: new Date().toISOString(),
        read: false
      });
    }

    setSuccess('Книга успешно добавлена (локально, без сохранения в БД).');
    setTitle('');
    setAuthor('');
    setIsbn('');
    setPublicationDate('');
    setPrice('');
    setDescription('');
    setPageCount('');
    setPreorder(false);
    setAvailabilityDate('');
    setLanguage('Русский');
    setInStock('0');
    setCoverImage('');
    setPublisher('');
    setTopic('');
  };

  return (
    <div className="admin-add-book-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Админ', path: '/admin/add-book' },
              { label: 'Добавление книги' }
            ]}
          />
          <section className="admin-add-book-section">
            <h1 className="page-title">Добавить новую книгу</h1>
            <form className="admin-book-form" onSubmit={handleSubmit}>
              <div className="admin-book-form__field">
                <label htmlFor="title">Название *</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="admin-book-form__field">
                <label htmlFor="author">Автор *</label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
              <div className="admin-book-form__row">
                <div className="admin-book-form__field">
                  <label htmlFor="isbn">ISBN</label>
                  <input
                    id="isbn"
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </div>
                <div className="admin-book-form__field">
                  <label htmlFor="publicationDate">Дата публикации</label>
                  <input
                    id="publicationDate"
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-book-form__row">
                <div className="admin-book-form__field">
                  <label htmlFor="price">Цена, BYN *</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="admin-book-form__field">
                  <label htmlFor="pageCount">Количество страниц</label>
                  <input
                    id="pageCount"
                    type="number"
                    min="1"
                    value={pageCount}
                    onChange={(e) => setPageCount(e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-book-form__field">
                <label htmlFor="description">Описание</label>
                <textarea
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="admin-book-form__row">
                <div className="admin-book-form__field">
                  <label htmlFor="category">Категория</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="new">Новинки</option>
                    <option value="classic">Классика</option>
                    <option value="fantasy">Фантастика</option>
                  </select>
                </div>
                <div className="admin-book-form__field admin-book-form__field--checkbox">
                  <label htmlFor="preorder">
                    <input
                      id="preorder"
                      type="checkbox"
                      checked={preorder}
                      onChange={(e) => setPreorder(e.target.checked)}
                    />
                    Предзаказ
                  </label>
                </div>
              </div>
              <div className="admin-book-form__row">
                <div className="admin-book-form__field">
                  <label htmlFor="availabilityDate">Дата доступности</label>
                  <input
                    id="availabilityDate"
                    type="date"
                    value={availabilityDate}
                    onChange={(e) => setAvailabilityDate(e.target.value)}
                  />
                </div>
                <div className="admin-book-form__field">
                  <label htmlFor="language">Язык</label>
                  <input
                    id="language"
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-book-form__row">
                <div className="admin-book-form__field">
                  <label htmlFor="inStock">В наличии (шт.)</label>
                  <input
                    id="inStock"
                    type="number"
                    min="0"
                    value={inStock}
                    onChange={(e) => setInStock(e.target.value)}
                  />
                </div>
                <div className="admin-book-form__field">
                  <label htmlFor="coverImage">Обложка (URL) *</label>
                  <input
                    id="coverImage"
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>
              <div className="admin-book-form__field">
                <label htmlFor="publisher">Издательство</label>
                <input
                  id="publisher"
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  placeholder="Мир Книг"
                />
              </div>
              <div className="admin-book-form__field">
                <label htmlFor="topic">Тематика</label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Фэнтези, классика..."
                />
              </div>
              {success && <div className="admin-book-form__success">{success}</div>}
              <button type="submit" className="admin-book-form__submit">
                Добавить книгу
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminAddBook;


