import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';

const mapBookFromApi = (book) => {
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
    image: book.link || '/project11a-web-the-seal-division/assets/images/books/new1.png',
    publisher: book.publisher?.name || book.publisher || '',
    topic: book.category?.name || '',
    preorder: Boolean(book.preorder),
    availableDate: book.available_date || null,
    inStock: true
  };
};

export const useBooks = (category) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let data;
        
        if (category) {
          data = await apiService.getBooksByCategory(category);
        } else {
          data = await apiService.getAllBooks();
        }
        
        const mapped = Array.isArray(data) ? data.map(mapBookFromApi) : [];
        setBooks(mapped);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  return { books, loading, error };
};