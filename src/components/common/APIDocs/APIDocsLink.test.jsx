import { render, screen } from '@testing-library/react';
import APIDocsLink from './APIDocsLink';

describe('API Docs component', () => {
  test('renders API link component on the root path', () => {
    render(<APIDocsLink />);
    expect(screen.getByText(/API Documentation/i)).toBeInTheDocument();
  });
});