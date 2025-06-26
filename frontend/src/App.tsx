import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api'; // backend URL

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { username, password });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      localStorage.setItem('token', response.data.token); // store token
      setIsLoggedIn(true);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Login failed');
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setMessage('Logged out.');
  };

  return (
    <div className="App">
      <h1>Simple Task Manager</h1>
      {isLoggedIn ? (
        <div>
          <h2>Welcome!</h2>
          <p>{message}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>{message || 'Register or Login'}</h2>
          <form onSubmit={handleRegister}>
            <h3>Register</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <br />
          <form onSubmit={handleLogin}>
            <h3>Login</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;