const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); 

dotenv.config(); // Load .env variables

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'https://ominous-carnival-qwg674479j624grx-3000.app.github.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Define Auth Routes
app.use('/api/auth', authRoutes);

// Simple root route
app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));