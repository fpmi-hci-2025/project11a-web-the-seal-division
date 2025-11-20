class ApiService {
  constructor() {
    this.baseURL = 'https://project11a-backend-the-seal-division.onrender.com/api';
    this.cache = new Map();
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const cacheKey = url + JSON.stringify(options);
      
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getBooks(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/books${queryString ? `?${queryString}` : ''}`);
  }

  async getBookById(id) {
    return this.request(`/books/${id}`);
  }

  async getBooksByCategory(category, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/books/category/${category}${queryString ? `?${queryString}` : ''}`);
  }

  async getCategories() {
    return this.request('/categories');
  }

  async getSales() {
    return this.request('/sales');
  }

  async getSaleById(id) {
    return this.request(`/sales/${id}`);
  }

  async searchBooks(query, params = {}) {
    const searchParams = new URLSearchParams({ q: query, ...params });
    return this.request(`/search?${searchParams}`);
  }
}

export const apiService = new ApiService();