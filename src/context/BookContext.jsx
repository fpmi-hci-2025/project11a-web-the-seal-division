import React, { createContext, useContext, useReducer } from 'react';

// Создаем контекст
const BookContext = createContext();

// Начальное состояние
const initialState = {
  favorites: [],
  cart: [],
  books: [],
  sales: [],
  loading: false,
  error: null
};

// Редюсер для управления состоянием
const bookReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      // Проверяем, нет ли уже книги в избранном
      if (state.favorites.find(book => book.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(book => book.id !== action.payload)
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.bookId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload
      };
    
    case 'SET_SALES':
      return {
        ...state,
        sales: action.payload
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    
    default:
      return state;
  }
};

// Провайдер контекста
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

// Хук для использования контекста
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};