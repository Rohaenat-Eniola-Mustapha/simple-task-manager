const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // For handling Cross-Origin Resource Sharing

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // Allows parsing of JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Define Routes
// User authentication routes (register, login)
app.use('/api/auth', require('./routes/authRoutes'));
// Task management routes
app.use('/api/tasks', require('./routes/tasks')); 

// Simple root route
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));