import React, { createContext, useContext, useState, useCallback } from 'react';
import bcrypt from 'bcryptjs';
import { apiService } from '../services/apiService';

const AuthContext = createContext(null);

const initialUser = null;

const mapUserFromApi = (apiUser) => {
  if (!apiUser) return null;

  const firstName = apiUser.first_name || '';
  const lastName = apiUser.last_name || '';

  return {
    id: apiUser.id,
    name: (firstName || lastName)
      ? `${firstName} ${lastName}`.trim()
      : apiUser.email,
    email: apiUser.email,
    role: apiUser.role || 'customer',
    subscriptions: [],
    notifications: []
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);

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
    return mapped;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
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
    setUser((prev) =>
      withDefaults({
        ...prev,
        subscriptions: Array.from(new Set([...(prev?.subscriptions || []), publisher]))
      })
    );
  }, [user]);

  const addNotification = useCallback((notification) => {
    if (!user) return;
    setUser((prev) =>
      withDefaults({
        ...prev,
        notifications: [...(prev?.notifications || []), notification]
      })
    );
  }, [user]);

  const markNotificationsRead = useCallback(() => {
    if (!user) return;
    setUser((prev) =>
      withDefaults({
        ...prev,
        notifications: (prev?.notifications || []).map((n) => ({ ...n, read: true }))
      })
    );
  }, [user]);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    addOrder,
    subscribeToPublisher,
    addNotification,
    markNotificationsRead
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


