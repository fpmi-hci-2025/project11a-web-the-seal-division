class ApiService {
  constructor() {
    this.baseURL = 'https://project11a-backend-the-seal-division.onrender.com';
    this.cache = new Map();
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const cacheKey = url + JSON.stringify(options);
      console.log('API Request to:', url); 
      
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

  // КНИГИ
  async getAllBooks() {
    return this.request('/books/all');
  }

  async getBooks(params = {}) {
    // Сохраняем метод для обратной совместимости, проксируя на /books/all
    const queryString = new URLSearchParams(params).toString();
    const base = '/books/all';
    return this.request(`${base}${queryString ? `?${queryString}` : ''}`);
  }

  async getBookById(id) {
    return this.request(`/books/${id}`);
  }

  async getBooksByCategory(category, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    // В swagger путь /books/categories/{category}
    return this.request(
      `/books/categories/${encodeURIComponent(category)}${queryString ? `?${queryString}` : ''}`
    );
  }

  // КАТЕГОРИИ
  async getCategories() {
    return this.request('/categories/all');
  }

  // СКИДКИ (акции)
  async getSales() {
    // Используем /discounts/all и маппим к сущности Sale фронтенда
    const discounts = await this.request('/discounts/all');
    return discounts.map((d) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      percentage: d.percentage,
      // Плейсхолдер-картинка для акций, т.к. API не возвращает изображение
      image: '/project11a-web-the-seal-division/assets/images/sales/sale1.jpg'
    }));
  }
}

export const apiService = new ApiService();