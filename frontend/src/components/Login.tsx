import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_BASE_URL}/api/auth`;

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const res = await axios.post(`${API_URL}/login`, {
                email,
                password
            });
            setMessage(res.data.message || 'Login successful!');
            localStorage.setItem('token', res.data.token); // Store the JWT
            navigate('/dashboard'); // Redirect to dashboard

        } catch (err: any) {
            console.error('Login error:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Login failed. Invalid credentials.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <span className="link-text" onClick={() => navigate('/register')}>Register here</span>
            </p>
        </div>
    );
};

export default Login;