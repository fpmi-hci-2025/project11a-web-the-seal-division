import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext(null);

const initialUser = null;

const USERS_STORAGE_KEY = 'bookstore_users';
const ORDERS_STORAGE_KEY = 'orders';

const getStoredUsers = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse users from storage', e);
    return [];
  }
};

const setStoredUsers = (users) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users to storage', e);
  }
};

const getStoredOrders = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse orders from storage', e);
    return [];
  }
};

const setStoredOrders = (orders) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders to storage', e);
  }
};

const ensureAdminUser = () => {
  const users = getStoredUsers();
  const adminEmail = 'admin@mir-knig.by';
  const existingAdmin = users.find((u) => u.email === adminEmail);

  if (existingAdmin) {
    return;
  }

  // Создаём администратора с паролем 111111 и bcrypt-хешем в "БД" (localStorage)
  const passwordHash = bcrypt.hashSync('111111', 10);

  const adminUser = {
    id: Date.now(),
    name: 'Администратор',
    email: adminEmail,
    role: 'admin',
    passwordHash,
    orders: [],
    subscriptions: [],
    notifications: []
  };

  setStoredUsers([...users, adminUser]);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // Гарантируем наличие администратора в хранилище при инициализации приложения
    ensureAdminUser();
  }, []);

  const withDefaults = (partialUser) => ({
    ...partialUser,
    orders: partialUser.orders || [],
    subscriptions: partialUser.subscriptions || [],
    notifications: partialUser.notifications || []
  });

  const login = useCallback(async (credentials) => {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Укажите e-mail и пароль');
    }

    ensureAdminUser();
    const users = getStoredUsers();
    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      throw new Error('Пользователь с таким e-mail не найден');
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Неверный пароль');
    }

    const loggedUser = withDefaults({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role || 'customer',
      orders: existingUser.orders || [],
      subscriptions: existingUser.subscriptions || [],
      notifications: existingUser.notifications || []
    });

    setUser(loggedUser);
    return loggedUser;
  }, []);

  const register = useCallback(async (data) => {
    const { name, email, password, phone } = data;

    if (!name || !email || !password) {
      throw new Error('Заполните все обязательные поля');
    }

    ensureAdminUser();
    const users = getStoredUsers();

    if (users.some((u) => u.email === email)) {
      throw new Error('Пользователь с таким e-mail уже существует');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userRecord = {
      id: Date.now(),
      name,
      email,
      phone,
      role: 'customer',
      passwordHash,
      orders: [],
      subscriptions: [],
      notifications: []
    };

    const updatedUsers = [...users, userRecord];
    setStoredUsers(updatedUsers);

    const newUser = withDefaults({
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      role: userRecord.role,
      orders: userRecord.orders
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

    // Сохраняем заказ как в "таблице" пользователей, так и в общей "таблице" заказов для админа
    const users = getStoredUsers();
    const updatedUsers = users.map((u) =>
      u.email === user.email
        ? {
            ...u,
            orders: [...(u.orders || []), order]
          }
        : u
    );
    setStoredUsers(updatedUsers);

    const existingOrders = getStoredOrders();
    const orderWithCustomer = {
      ...order,
      customerEmail: user.email,
      customerName: user.name
    };
    setStoredOrders([...existingOrders, orderWithCustomer]);
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


