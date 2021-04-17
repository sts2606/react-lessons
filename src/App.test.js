import { render, screen } from '@testing-library/react';
import MainApp from './App';

test('renders learn react link', () => {
  const div = document.createElement('div');
  render(<MainApp />, div);
});
