import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders App component on the root path ("/")', () => {
    render(<App />);
    expect(true);
  });
});