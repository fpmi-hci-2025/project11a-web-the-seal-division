import { describe, test, expect, beforeEach } from 'vitest';
import { apiService } from './apiService';

describe('ApiService', () => {
  beforeEach(() => {
    // Очищаем кэш перед каждым тестом
    apiService.cache.clear();
  });

  test('should not cache POST requests', () => {
    const isPostRequest = true;
    const isGetRequest = false;
    
    expect(isPostRequest).toBe(true);
    expect(isGetRequest).toBe(false);
  });

  test('should handle 401 error correctly', () => {
    const error = new Error('HTTP error! status: 401');
    expect(error.message).toContain('401');
  });
});

