import React, { createContext, useContext, useState, useCallback } from 'react';
import bcrypt from 'bcryptjs';
import { apiService } from '../services/apiService';

const AuthContext = createContext(null);

const initialUser = null;

const mapUserFromApi = (apiUser) => {
  if (!apiUser) return null;

  const firstName = apiUser.first_name || '';
  const lastName = apiUser.last_name || '';
  
  // Нормализуем роль: "Администратор" -> "admin", "admin" -> "admin", и т.д.
  let normalizedRole = (apiUser.role || 'customer').toLowerCase();
  if (normalizedRole === 'администратор' || normalizedRole === 'administrator') {
    normalizedRole = 'admin';
  }

  return {
    id: apiUser.id,
    name: (firstName || lastName)
      ? `${firstName} ${lastName}`.trim()
      : apiUser.email,
    email: apiUser.email,
    role: normalizedRole,
    subscriptions: [],
    notifications: []
  };
};

export const AuthProvider = ({ children }) => {
  // Восстанавливаем пользователя из localStorage при инициализации
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error('Failed to restore user from localStorage:', error);
    }
    return initialUser;
  });

  const withDefaults = (partialUser) => ({
    ...partialUser,
    subscriptions: partialUser.subscriptions || [],
    notifications: partialUser.notifications || []
  });

  // ЛОГИН через backend API (/login)
  const login = useCallback(async (credentials) => {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Укажите e-mail и пароль');
    }

    const apiUser = await apiService.login({ email, password });

    if (!apiUser) {
      throw new Error('Неверный e-mail или пароль');
    }

    const mapped = withDefaults(mapUserFromApi(apiUser));
    setUser(mapped);
    // Сохраняем пользователя в localStorage
    try {
      localStorage.setItem('user', JSON.stringify(mapped));
    } catch (error) {
      console.error('Failed to save user to localStorage:', error);
    }
    return mapped;
  }, []);

  // РЕГИСТРАЦИЯ через backend API (/users)
  const register = useCallback(async (data) => {
    const { name, email, password, phone } = data;

    if (!name || !email || !password) {
      throw new Error('Заполните все обязательные поля');
    }

    const [firstName, lastName = ''] = name.split(' ');

    // Хешируем пароль на клиенте перед отправкой (BCrypt)
    const passwordHash = await bcrypt.hash(password, 10);

    const userPayload = {
      address: '',
      email,
      first_name: firstName || name,
      id: 0,
      last_name: lastName,
      password: passwordHash,
      phone: phone || '',
      reg_date: new Date().toISOString(),
      role: 'customer'
    };

    const createdUser = await apiService.registerUser(userPayload);
    const mapped = withDefaults(mapUserFromApi(createdUser));
    setUser(mapped);
    // Сохраняем пользователя в localStorage
    try {
      localStorage.setItem('user', JSON.stringify(mapped));
    } catch (error) {
      console.error('Failed to save user to localStorage:', error);
    }
    return mapped;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // Удаляем пользователя из localStorage
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to remove user from localStorage:', error);
    }
  }, []);

  // Создание заказа через backend API (/orders)
  const addOrder = useCallback(async (order) => {
    if (!user) return null;

    const payload = {
      address: order.address,
      total_amount: order.total,
      status: order.status || 'новый',
      items: JSON.stringify(order.items),
      user_id: user.id
    };

    const createdOrder = await apiService.createOrder(payload);
    return createdOrder;
  }, [user]);

  const subscribeToPublisher = useCallback((publisher) => {
    if (!user) return;
    const isSubscribed = user.subscriptions?.includes(publisher);
    
    if (isSubscribed) {
      // Отписка
      setUser((prev) => {
        const updated = withDefaults({
          ...prev,
          subscriptions: (prev?.subscriptions || []).filter(sub => sub !== publisher)
        });
        // Сохраняем в localStorage
        try {
          localStorage.setItem('user', JSON.stringify(updated));
        } catch (error) {
          console.error('Failed to save user to localStorage:', error);
        }
        return updated;
      });
    } else {
      // Подписка
      setUser((prev) => {
        const newSubscriptions = Array.from(new Set([...(prev?.subscriptions || []), publisher]));
        const updated = withDefaults({
          ...prev,
          subscriptions: newSubscriptions
        });
        // Сохраняем в localStorage
        try {
          localStorage.setItem('user', JSON.stringify(updated));
        } catch (error) {
          console.error('Failed to save user to localStorage:', error);
        }
        return updated;
      });
      // Добавляем уведомление о подписке
      addNotification({
        id: Date.now(),
        text: `Вы подписались на новости издательства "${publisher}"`,
        date: new Date().toISOString(),
        read: false
      });
    }
  }, [user]);

  const unsubscribeFromPublisher = useCallback((publisher) => {
    if (!user) return;
    setUser((prev) => {
      const updated = withDefaults({
        ...prev,
        subscriptions: (prev?.subscriptions || []).filter(sub => sub !== publisher)
      });
      // Сохраняем в localStorage
      try {
        localStorage.setItem('user', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save user to localStorage:', error);
      }
      return updated;
    });
  }, [user]);

  const addNotification = useCallback((notification) => {
    if (!user) return;
    setUser((prev) => {
      const updated = withDefaults({
        ...prev,
        notifications: [...(prev?.notifications || []), notification]
      });
      // Сохраняем в localStorage
      try {
        localStorage.setItem('user', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save user to localStorage:', error);
      }
      return updated;
    });
  }, [user]);

  const markNotificationsRead = useCallback(() => {
    if (!user) return;
    setUser((prev) => {
      const updated = withDefaults({
        ...prev,
        notifications: (prev?.notifications || []).map((n) => ({ ...n, read: true }))
      });
      // Сохраняем в localStorage
      try {
        localStorage.setItem('user', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save user to localStorage:', error);
      }
      return updated;
    });
  }, [user]);

  // Функция для обновления заказов (для использования в Profile)
  const refreshOrders = useCallback(() => {
    // Отправляем событие для обновления заказов
    window.dispatchEvent(new CustomEvent('refreshOrders', { detail: { timestamp: Date.now() } }));
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    addOrder,
    subscribeToPublisher,
    unsubscribeFromPublisher,
    addNotification,
    markNotificationsRead,
    refreshOrders
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

export default AuthContext;


