class ApiService {
  constructor() {
    this.baseURL = 'https://project11a-backend-the-seal-division.onrender.com';
    this.cache = new Map();
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const isPostRequest = options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH' || options.method === 'DELETE';
      const cacheKey = url + JSON.stringify(options);
      console.log('API Request to:', url); 
      
      // Не кэшируем POST/PUT/PATCH/DELETE запросы
      if (!isPostRequest && this.cache.has(cacheKey)) {
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
        if (response.status === 401) {
          throw new Error('Неверный логин или пароль');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Кэшируем только GET запросы
      if (!isPostRequest) {
        this.cache.set(cacheKey, data);
      }
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

  async createBook(book) {
    return this.request('/books', {
      method: 'POST',
      body: JSON.stringify(book)
    });
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
    // Массив картинок для акций (используем разные картинки для разных акций)
    const saleImages = [
      '/project11a-web-the-seal-division/assets/images/sales/sale1.jpg',
      '/project11a-web-the-seal-division/assets/images/sales/sale2.jpg',
      '/project11a-web-the-seal-division/assets/images/sales/sale1.jpg', // fallback
      '/project11a-web-the-seal-division/assets/images/sales/sale2.jpg'  // fallback
    ];
    return discounts.map((d, index) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      percentage: d.percentage,
      // Используем разные картинки для разных акций
      image: saleImages[index % saleImages.length] || saleImages[0]
    }));
  }

  // АВТОРИЗАЦИЯ / ПОЛЬЗОВАТЕЛИ
  async login(credentials) {
    // credentials: { email, password }
    try {
      return await this.request('/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    } catch (error) {
      if (error.message.includes('401') || error.message.includes('HTTP error! status: 401')) {
        throw new Error('Неверный логин или пароль');
      }
      throw error;
    }
  }

  async registerUser(user) {
    // user соответствует entities.User
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  }

  // ЗАКАЗЫ
  async createOrder(order) {
    // order соответствует entities.Orders
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(order)
    });
  }

  async getAllOrders() {
    return this.request('/orders/all');
  }

  async getUserOrders(userId) {
    return this.request(`/orders/user/${userId}`);
  }

  async updateOrderStatus(orderId, status) {
    // Получаем текущий заказ
    const order = await this.request(`/orders/${orderId}`);
    
    // Обновляем статус в объекте заказа
    const updatedOrder = {
      ...order,
      status: status
    };
    
    // Отправляем PUT запрос для обновления заказа
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedOrder)
    });
  }

  // ОТЗЫВЫ
  async getReviewsByBookId(bookId) {
    return this.request(`/books/reviews/book/${bookId}`);
  }

  async createReview(bookId, review) {
    return this.request(`/books/reviews/${bookId}`, {
      method: 'POST',
      body: JSON.stringify(review)
    });
  }

  async deleteReview(reviewId) {
    return this.request(`/books/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  }
}

export const apiService = new ApiService();