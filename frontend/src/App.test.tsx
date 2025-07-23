import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders initial UI with Welcome message and links', () => {
  render(<App />); // no <MemoryRouter>

  expect(screen.getByText(/Welcome to Simple Task Manager!/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
});