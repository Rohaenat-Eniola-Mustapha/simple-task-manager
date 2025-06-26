const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Basic User Model (backend/models/User.js - you'd create this file)
// const User = require('./models/User'); // Assume you create this file

// Minimal User Route for Registration (backend/routes/auth.js - you'd create this file)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // In a real app, check if user exists first!
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // This would normally save to MongoDB via a Mongoose model
    // For this baseline, we're just simulating success
    console.log(`User registered: ${username} with hashed password`);
    res.status(201).json({ message: 'User registered successfully (simulated)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Minimal User Route for Login (backend/routes/auth.js - you'd create this file)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // Simulate user lookup and password check
  // In a real app, retrieve user from DB and compare hashed passwords
  if (username === 'testuser' && password === 'testpassword') { // REPLACE WITH REAL DB LOGIC!
    const token = jwt.sign({ id: 'someUserId', username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, message: 'Logged in successfully (simulated)' });
  } else {
    return res.status(400).json({ message: 'Invalid credentials (simulated)' });
  }
});

app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));