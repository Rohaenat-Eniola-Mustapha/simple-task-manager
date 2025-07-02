// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Will be our protected route
import './index.css'; // Use global styles

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<div className="container">
            <h1>Welcome to Simple Task Manager!</h1>
            <p>Please register or log in to manage your tasks.</p>
            </div>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;