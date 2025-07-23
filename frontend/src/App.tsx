import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div className="container">
          <h1>Welcome to Simple Task Manager!</h1>
          <p>Please register or log in to manage your tasks.</p>

          {/* 👇 ADD THESE INLINE FORMS for testing */}
          <div className="forms">
            <h2>Register</h2>
            <Register />

            <h2>Login</h2>
            <Login />
          </div>
        </div>

        <Routes>
          {/* Your actual routes, still preserved */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;