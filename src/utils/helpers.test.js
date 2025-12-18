import { describe, test, expect } from 'vitest';
import { formatPrice } from './helpers';

describe('formatPrice helper', () => {
  const normalizeSpaces = (str) => str.replace(/\u00A0/g, ' ');

  test('formats price correctly', () => {
    expect(normalizeSpaces(formatPrice(100))).toBe('100,00 BYN');
    expect(normalizeSpaces(formatPrice(99.99))).toBe('99,99 BYN');
    expect(normalizeSpaces(formatPrice(0))).toBe('0,00 BYN');
    expect(normalizeSpaces(formatPrice(1000))).toBe('1 000,00 BYN');
  });

  test('handles negative prices', () => {
    expect(normalizeSpaces(formatPrice(-100))).toBe('-100,00 BYN');
  });

  test('handles large numbers', () => {
    expect(normalizeSpaces(formatPrice(1000000))).toBe('1 000 000,00 BYN');
  });
});