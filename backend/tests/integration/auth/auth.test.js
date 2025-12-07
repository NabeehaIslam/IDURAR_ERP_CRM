require('../setup'); // Register all models
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('@/app');
const Admin = require('@/models/coreModels/Admin');
const AdminPassword = require('@/models/coreModels/AdminPassword');

describe('Authentication API Integration Tests', () => {
  let testAdmin;
  let authToken;

  // Create test admin before each test (since afterEach clears database)
  beforeEach(async () => {
    // Create a test admin user
    testAdmin = await Admin.create({
      email: 'test@idurar.com',
      name: 'Test',
      surname: 'Admin',
      enabled: true,
      role: 'owner'
    });

    // Create password for test admin (with salt)
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const password = 'testPassword123';
    const hashedPassword = bcrypt.hashSync(salt + password, 10);

    await AdminPassword.create({
      user: testAdmin._id,
      password: hashedPassword,
      salt: salt,
      emailVerified: true
    });
  });

  describe('POST /api/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com',
          password: 'testPassword123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result).toHaveProperty('token');
      expect(response.body.result).toHaveProperty('email');
      expect(response.body.result.email).toBe('test@idurar.com');

      // Save token for later tests
      authToken = response.body.result.token;
    });

    it('should reject login with invalid email', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'wrong@email.com',
          password: 'testPassword123'
        })
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should reject login with missing email', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          password: 'testPassword123'
        })
        .expect(409);

      expect(response.body.success).toBe(false);
    });

    it('should reject login with missing password', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com'
        })
        .expect(409);

      expect(response.body.success).toBe(false);
    });

    it('should reject login with disabled admin account', async () => {
      // Create disabled admin
      const disabledAdmin = await Admin.create({
        email: 'disabled@idurar.com',
        name: 'Disabled',
        surname: 'Admin',
        enabled: false,
        role: 'owner'
      });

      const bcrypt = require('bcryptjs');
      const salt = bcrypt.genSaltSync(10);
      const password = 'password123';
      const hashedPassword = bcrypt.hashSync(salt + password, 10);

      await AdminPassword.create({
        user: disabledAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true
      });

      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'disabled@idurar.com',
          password: 'password123'
        })
        .expect(409);

      expect(response.body.success).toBe(false);

      // Cleanup
      await Admin.findByIdAndDelete(disabledAdmin._id);
      await AdminPassword.deleteOne({ user: disabledAdmin._id });
    });
  });

  describe('POST /api/logout', () => {
    beforeEach(async () => {
      // Login to get fresh token
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com',
          password: 'testPassword123'
        });

      authToken = response.body.result.token;
    });

    it('should logout with valid token', async () => {
      const response = await request(app)
        .post('/api/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should reject logout without token', async () => {
      const response = await request(app)
        .post('/api/logout')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should reject logout with invalid token', async () => {
      const response = await request(app)
        .post('/api/logout')
        .set('Authorization', 'Bearer invalid_token_here')
        .expect(500);

      expect(response.body.success).toBe(false);
    });

    it('should reject logout with malformed authorization header', async () => {
      const response = await request(app)
        .post('/api/logout')
        .set('Authorization', 'InvalidFormat token')
        .expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/forgetpassword', () => {
    it('should handle non-existent email', async () => {
      const response = await request(app)
        .post('/api/forgetpassword')
        .send({
          email: 'nonexistent@email.com'
        });

      // API may return 404 or 500 depending on email service configuration
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject request with missing email', async () => {
      const response = await request(app)
        .post('/api/forgetpassword')
        .send({})
        .expect(409);

      expect(response.body.success).toBe(false);
    });

    it('should reject request with invalid email format', async () => {
      const response = await request(app)
        .post('/api/forgetpassword')
        .send({
          email: 'invalid-email-format'
        })
        .expect(409);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/resetpassword', () => {
    it('should reject reset with missing token', async () => {
      const response = await request(app)
        .post('/api/resetpassword')
        .send({
          password: 'newPassword123'
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject reset with missing password', async () => {
      const response = await request(app)
        .post('/api/resetpassword')
        .send({
          token: 'some_token'
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Authentication Flow Integration', () => {
    it('should complete full authentication cycle', async () => {
      // 1. Login
      const loginResponse = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com',
          password: 'testPassword123'
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
      const token = loginResponse.body.result.token;

      // 2. Use authenticated endpoint (logout)
      const logoutResponse = await request(app)
        .post('/api/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(logoutResponse.body.success).toBe(true);

      // 3. Try to use same token again (should fail)
      const retryResponse = await request(app)
        .post('/api/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(401);

      expect(retryResponse.body.success).toBe(false);
    });

    it('should handle multiple concurrent logins', async () => {
      // Login sequentially with small delay to ensure unique timestamps
      const responses = [];
      for (let i = 0; i < 3; i++) {
        const response = await request(app)
          .post('/api/login')
          .send({
            email: 'test@idurar.com',
            password: 'testPassword123'
          });
        responses.push(response);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      }

      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.result).toHaveProperty('token');
      });

      // Each should have unique token due to different timestamps
      const tokens = responses.map(r => r.body.result.token);
      const uniqueTokens = new Set(tokens);
      expect(uniqueTokens.size).toBe(3);
    });
  });

  describe('Security Tests', () => {
    it('should not expose password in response', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com',
          password: 'testPassword123'
        })
        .expect(200);

      // Verify password not in response
      expect(response.body.result).not.toHaveProperty('password');
      expect(JSON.stringify(response.body)).not.toContain('testPassword123');
      expect(JSON.stringify(response.body)).not.toContain('$2a$'); // bcrypt hash prefix
    });

    it('should reject SQL injection attempts', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: "admin' OR '1'='1",
          password: "password' OR '1'='1"
        })
        .expect(409);

      expect(response.body.success).toBe(false);
    });

    it('should reject XSS attempts in email field', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: '<script>alert("XSS")</script>@test.com',
          password: 'password123'
        })
        .expect(409);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Token Management', () => {
    it('should generate unique tokens for each login', async () => {
      const response1 = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com',
          password: 'testPassword123'
        });

      // Wait 1 second to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response2 = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com',
          password: 'testPassword123'
        });

      expect(response1.body.result.token).not.toBe(response2.body.result.token);
    });

    it('should include user data in response', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com',
          password: 'testPassword123'
        });

      const result = response.body.result;
      
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('token');
      expect(result.email).toBe('test@idurar.com');
    });

    it('should set appropriate token expiration', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@idurar.com',
          password: 'testPassword123'
        });

      const token = response.body.result.token;
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      expect(decoded).toHaveProperty('exp');
      expect(decoded).toHaveProperty('iat');
      expect(decoded.exp).toBeGreaterThan(decoded.iat);
    });
  });
});
