import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();

  return (
    <div className="book-details-page">
      <Header />
      <main className="main">
        <div className="container">
          <section className="book-details-section">
            <h1 className="page-title">Детали книги #{id}</h1>
            <div className="coming-soon">
              <h2>Страница в разработке</h2>
              <p>Скоро здесь появится подробная информация о книге</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetails;