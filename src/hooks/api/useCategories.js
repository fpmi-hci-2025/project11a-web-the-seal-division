import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCategories();
        // Ожидается массив сущностей Category { id, name }
        setCategories(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Error fetching categories:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};


