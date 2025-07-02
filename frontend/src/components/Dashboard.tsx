import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Basic check if token exists
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // If no token, redirect to login
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="container">
            <h2>Welcome to your Dashboard!</h2>
            <p>You are logged in.</p>
            <p>This is where your task list will eventually go.</p>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
    );
};

export default Dashboard;