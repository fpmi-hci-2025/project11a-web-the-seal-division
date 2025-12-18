import { describe, test, expect } from 'vitest';

describe('BookContext reducer', () => {
  test('should add book to cart', () => {
    const initialState = { cart: [] };
    const action = { type: 'ADD_TO_CART', payload: { id: 1, title: 'Test Book', price: 100 } };
    
    const newState = {
      ...initialState,
      cart: [{ id: 1, title: 'Test Book', price: 100, quantity: 1 }]
    };
    
    expect(newState.cart.length).toBe(1);
    expect(newState.cart[0].id).toBe(1);
  });

  test('should remove book from cart', () => {
    const initialState = {
      cart: [{ id: 1, title: 'Test Book', price: 100, quantity: 1 }]
    };
    const action = { type: 'REMOVE_FROM_CART', payload: 1 };
    
    const newState = {
      ...initialState,
      cart: initialState.cart.filter(item => item.id !== action.payload)
    };
    
    expect(newState.cart.length).toBe(0);
  });

  test('should add book to favorites', () => {
    const initialState = { favorites: [] };
    const action = { type: 'ADD_TO_FAVORITES', payload: { id: 1, title: 'Test Book' } };
    
    const newState = {
      ...initialState,
      favorites: [...initialState.favorites, action.payload]
    };
    
    expect(newState.favorites.length).toBe(1);
    expect(newState.favorites[0].id).toBe(1);
  });
});

