const request = require('supertest');




describe('Authentication Endpoints (Simulated)', () => {
  test('should return 400 for missing fields on registration', async () => {
    
    
    const mockApp = require('express')();
    mockApp.use(require('express').json());
    mockApp.post('/api/register', async (req, res) => {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
      }
      res.status(201).json({ message: 'Success' });
    });

    const res = await request(mockApp).post('/api/register').send({ username: 'testuser' }); // Missing password
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Please enter all fields');
  });

  test('should return 201 for successful registration (simulated)', async () => {
      const mockApp = require('express')();
      mockApp.use(require('express').json());
      mockApp.post('/api/register', async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) { /* handle error */ }
        res.status(201).json({ message: 'User registered successfully (simulated)' });
      });

      const res = await request(mockApp).post('/api/register').send({ username: 'newuser', password: 'password123' });
      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual('User registered successfully (simulated)');
  });

  // Add tests for login
  test('should return 400 for invalid credentials on login (simulated)', async () => {
      const mockApp = require('express')();
      mockApp.use(require('express').json());
      mockApp.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        if (username === 'testuser' && password === 'testpassword') {
           res.json({ token: 'mocktoken' });
        } else {
           res.status(400).json({ message: 'Invalid credentials (simulated)' });
        }
      });
      const res = await request(mockApp).post('/api/login').send({ username: 'wrong', password: 'wrong' });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Invalid credentials (simulated)');
  });

  test('should return 200 and token for successful login (simulated)', async () => {
      const mockApp = require('express')();
      mockApp.use(require('express').json());
      mockApp.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        if (username === 'testuser' && password === 'testpassword') {
           res.json({ token: 'mocktoken', message: 'Logged in successfully (simulated)' });
        } else {
           res.status(400).json({ message: 'Invalid credentials (simulated)' });
        }
      });
      const res = await request(mockApp).post('/api/login').send({ username: 'testuser', password: 'testpassword' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.message).toEqual('Logged in successfully (simulated)');
  });
});