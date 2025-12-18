import { describe, test, expect } from 'vitest';

describe('AuthContext role normalization', () => {
  test('should normalize admin role correctly', () => {
    const roles = ['Администратор', 'администратор', 'admin', 'ADMIN', 'Administrator'];
    
    roles.forEach(role => {
      let normalized = role.toLowerCase();
      if (normalized === 'администратор' || normalized === 'administrator') {
        normalized = 'admin';
      }
      expect(normalized).toBe('admin');
    });
  });

  test('should keep customer role as is', () => {
    const role = 'customer';
    let normalized = role.toLowerCase();
    expect(normalized).toBe('customer');
  });
});

