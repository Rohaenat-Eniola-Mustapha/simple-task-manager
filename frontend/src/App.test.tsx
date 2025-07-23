import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Simple Task Manager heading', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to Simple Task Manager!/i)).toBeInTheDocument();
  });

  test('renders Register and Login links', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });
});