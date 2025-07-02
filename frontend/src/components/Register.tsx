import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/auth'; // Point to your backend auth API

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '', // Added email
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { username, email, password, confirmPassword } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password
            });
            setMessage(res.data.message || 'Registration successful!');
            localStorage.setItem('token', res.data.token); // Store the JWT
            navigate('/dashboard'); // Redirect to dashboard

        } catch (err: any) {
            console.error('Registration error:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={onSubmit}>
                <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required minLength={6} />
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password" required minLength={6} />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <span className="link-text" onClick={() => navigate('/login')}>Login here</span>
            </p>
        </div>
    );
};

export default Register;