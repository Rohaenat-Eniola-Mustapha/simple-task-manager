const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // For handling Cross-Origin Resource Sharing

const app = express();

require('dotenv').config();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // Allows parsing of JSON request bodies

app.use(cors({
    origin: 'https://stm-frontend-92cyrveb.agreeablecliff-5f0b89d6.westus.azurecontainerapps.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'] // Allowed headers
}));


// Define Routes
// User authentication routes (register, login)
app.use('/api/auth', require('./routes/authRoutes'));
// Task management routes
app.use('/api/tasks', require('./routes/tasks'));

// Simple root route
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));