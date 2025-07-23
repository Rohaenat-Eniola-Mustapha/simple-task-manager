jest.mock('axios', () => ({
  // Default mock for axios module
  __esModule: true, // This is important for ES Modules
  default: { // This mocks the default export, which is the axios instance itself
    post: jest.fn(), // Make axios.post a mock function
    get: jest.fn(),  // Make axios.get a mock function
  },
}));

import React, { useState } from 'react';
import axios from 'axios'; // This imports the mocked axios instance
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  // Add a beforeEach hook to clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Simple Task Manager heading', () => {
    render(<App />);
    expect(screen.getByText(/simple task manager/i)).toBeInTheDocument();
  });

  test('renders Register and Login forms initially', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /register/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /login/i, level: 3 })).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/username/i).length).toBe(2);
    expect(screen.getAllByPlaceholderText(/password/i).length).toBe(2);
  });

  test('shows registration success message', async () => {
    // Now axios.post is guaranteed to be a mock function
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { message: 'User registered successfully (simulated)' } });

    render(<App />);
    const registerButton = screen.getByRole('button', { name: /register/i });
    const usernameInput = screen.getAllByPlaceholderText(/username/i)[0]; // First username input for register
    const passwordInput = screen.getAllByPlaceholderText(/password/i)[0]; // First password input for register

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/User registered successfully \(simulated\)/i)).toBeInTheDocument();
    });
    // Optionally, assert that axios.post was called
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/register', { username: 'testuser', password: 'password123' });
  });

  test('shows login success message and Welcome message on successful login', async () => {
    // Now axios.post is guaranteed to be a mock function
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { token: 'mock-token', message: 'Logged in successfully (simulated)' } });

    render(<App />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const usernameInput = screen.getAllByPlaceholderText(/username/i)[1]; // Second username input for login
    const passwordInput = screen.getAllByPlaceholderText(/password/i)[1]; // Second password input for login

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Logged in successfully \(simulated\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /register/i })).not.toBeInTheDocument(); // Forms should disappear
    });
    // Optionally, assert that axios.post was called
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/login', { username: 'testuser', password: 'testpassword' });
  });
});