import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';

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
          data = await apiService.getBooks();
        }
        
        setBooks(data);
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