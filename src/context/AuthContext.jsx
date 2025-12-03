import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const initialUser = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);

  const withDefaults = (partialUser) => ({
    ...partialUser,
    orders: partialUser.orders || [],
    subscriptions: partialUser.subscriptions || [],
    notifications: partialUser.notifications || []
  });

  const login = useCallback((credentials) => {
    // Симуляция логина. В реальном приложении здесь будет запрос к API.
    const { email, password } = credentials;

    // Простая заглушка: если логин admin — считаем пользователя администратором
    const isAdmin = email === 'admin@mir-knig.by';

    const loggedUser = withDefaults({
      id: Date.now(),
      name: isAdmin ? 'Администратор' : 'Покупатель',
      email,
      role: isAdmin ? 'admin' : 'customer',
      orders: []
    });

    // Простая проверка на пустой пароль
    if (!password) {
      throw new Error('Пароль не может быть пустым');
    }

    setUser(loggedUser);
    return loggedUser;
  }, []);

  const register = useCallback((data) => {
    // Симуляция регистрации. В реальном приложении здесь будет запрос к API.
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error('Заполните все обязательные поля');
    }

    const newUser = withDefaults({
      id: Date.now(),
      name,
      email,
      role: 'customer',
      orders: []
    });

    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addOrder = useCallback((order) => {
    if (!user) return;
    setUser((prev) =>
      withDefaults({
        ...prev,
        orders: [...(prev?.orders || []), order]
      })
    );
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


