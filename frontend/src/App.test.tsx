import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders Simple Task Manager heading', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const heading = screen.getByRole('heading', { name: /simple task manager/i });
  expect(heading).toBeInTheDocument();
});

test('renders Register and Login forms initially', async () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByRole('button', { name: /register/i })).toBeInTheDocument();

  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('shows registration success message', async () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <App />
    </MemoryRouter>
  );

  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const registerButton = screen.getByRole('button', { name: /register/i });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(registerButton);

  expect(await screen.findByText(/registration successful/i)).toBeInTheDocument();
});

test('shows login success message and Welcome message on successful login', async () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(loginButton);

  expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  expect(await screen.findByText(/welcome, testuser/i)).toBeInTheDocument();
});