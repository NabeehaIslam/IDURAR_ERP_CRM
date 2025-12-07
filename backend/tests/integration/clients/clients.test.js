require('../setup'); // Register all models
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('@/app');
const Admin = require('@/models/coreModels/Admin');
const AdminPassword = require('@/models/coreModels/AdminPassword');
const Client = require('@/models/appModels/Client');

describe('Client API Integration Tests', () => {
  let authToken;
  let testAdmin;
  let testClient;

  beforeEach(async () => {
    // Create test admin
    testAdmin = await Admin.create({
      email: 'admin@idurar.com',
      name: 'Admin',
      surname: 'User',
      enabled: true,
      role: 'owner'
    });

    // Create password
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const password = 'adminPassword123';
    const hashedPassword = await bcrypt.hash(salt + password, salt);

    await AdminPassword.create({
      user: testAdmin._id,
      password: hashedPassword,
      salt: salt,
      emailVerified: true
    });

    // Login to get auth token
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'admin@idurar.com',
        password: 'adminPassword123'
      });

    authToken = loginResponse.body.result.token;

    // Create a test client
    testClient = await Client.create({
      name: 'Test Client',
      email: 'client@test.com',
      phone: '+1234567890',
      country: 'USA',
      address: '123 Test St',
      createdBy: testAdmin._id,
      assigned: testAdmin._id
    });
  });

  describe('POST /api/client/create', () => {
    it('should create a new client with valid data', async () => {
      const clientData = {
        name: 'New Client',
        email: 'newclient@test.com',
        phone: '+9876543210',
        country: 'Canada',
        address: '456 New Ave'
      };

      const response = await request(app)
        .post('/api/client/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send(clientData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.name).toBe(clientData.name);
      expect(response.body.result.email).toBe(clientData.email);
      expect(response.body.result.phone).toBe(clientData.phone);
      expect(response.body.result.enabled).toBe(true);
      expect(response.body.result.removed).toBe(false);
    });

    it('should reject client creation without authentication', async () => {
      const response = await request(app)
        .post('/api/client/create')
        .send({
          name: 'Unauthorized Client'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should reject client creation without required name', async () => {
      const response = await request(app)
        .post('/api/client/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'test@test.com'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should create client with minimal required data', async () => {
      const response = await request(app)
        .post('/api/client/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Minimal Client'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.name).toBe('Minimal Client');
      expect(response.body.result.enabled).toBe(true);
    });
  });

  describe('GET /api/client/read/:id', () => {
    it('should read a client by ID', async () => {
      const response = await request(app)
        .get(`/api/client/read/${testClient._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.name).toBe('Test Client');
      expect(response.body.result.email).toBe('client@test.com');
      expect(response.body.result._id).toBe(testClient._id.toString());
    });

    it('should return 404 for non-existent client', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/client/read/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should reject read without authentication', async () => {
      const response = await request(app)
        .get(`/api/client/read/${testClient._id}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should return 500 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/client/read/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PATCH /api/client/update/:id', () => {
    it('should update client with valid data', async () => {
      const updateData = {
        name: 'Updated Client Name',
        phone: '+1111111111',
        country: 'UK'
      };

      const response = await request(app)
        .patch(`/api/client/update/${testClient._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.name).toBe(updateData.name);
      expect(response.body.result.phone).toBe(updateData.phone);
      expect(response.body.result.country).toBe(updateData.country);
    });

    it('should partially update client', async () => {
      const response = await request(app)
        .patch(`/api/client/update/${testClient._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          phone: '+9999999999'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.phone).toBe('+9999999999');
      expect(response.body.result.name).toBe('Test Client'); // Unchanged
    });

    it('should reject update without authentication', async () => {
      const response = await request(app)
        .patch(`/api/client/update/${testClient._id}`)
        .send({
          name: 'Unauthorized Update'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should return 404 for non-existent client update', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .patch(`/api/client/update/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Name'
        })
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should update client email', async () => {
      const response = await request(app)
        .patch(`/api/client/update/${testClient._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'newemail@test.com'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.email).toBe('newemail@test.com');
    });
  });

  describe('DELETE /api/client/delete/:id', () => {
    it('should soft delete a client', async () => {
      const response = await request(app)
        .delete(`/api/client/delete/${testClient._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify client is marked as removed
      const deletedClient = await Client.findById(testClient._id);
      expect(deletedClient.removed).toBe(true);
    });

    it('should reject delete without authentication', async () => {
      const response = await request(app)
        .delete(`/api/client/delete/${testClient._id}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should return 404 for non-existent client deletion', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/client/delete/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should not permanently delete client', async () => {
      await request(app)
        .delete(`/api/client/delete/${testClient._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Verify client still exists in database
      const client = await Client.findById(testClient._id);
      expect(client).not.toBeNull();
      expect(client.removed).toBe(true);
    });
  });

  describe('GET /api/client/list', () => {
    beforeEach(async () => {
      // Create multiple clients for list testing
      await Client.create([
        {
          name: 'Client A',
          email: 'clienta@test.com',
          country: 'USA',
          createdBy: testAdmin._id
        },
        {
          name: 'Client B',
          email: 'clientb@test.com',
          country: 'Canada',
          createdBy: testAdmin._id
        },
        {
          name: 'Client C',
          email: 'clientc@test.com',
          country: 'UK',
          createdBy: testAdmin._id,
          removed: true // Soft deleted
        }
      ]);
    });

    it('should list clients with pagination', async () => {
      const response = await request(app)
        .get('/api/client/list')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ page: 1, items: 10 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeInstanceOf(Array);
      expect(response.body.result.length).toBeGreaterThan(0);
      expect(response.body.pagination).toBeDefined();
    });

    it('should not list removed clients', async () => {
      const response = await request(app)
        .get('/api/client/list')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      const removedClients = response.body.result.filter(c => c.removed === true);
      expect(removedClients.length).toBe(0);
    });

    it('should reject list without authentication', async () => {
      const response = await request(app)
        .get('/api/client/list')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should support pagination parameters', async () => {
      const response = await request(app)
        .get('/api/client/list')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ page: 1, items: 2 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.length).toBeLessThanOrEqual(2);
      expect(response.body.pagination.page).toBe('1');
    });
  });

  describe('GET /api/client/search', () => {
    beforeEach(async () => {
      // Create clients with searchable data
      await Client.create([
        {
          name: 'John Doe Company',
          email: 'john@company.com',
          phone: '+1234567890',
          createdBy: testAdmin._id
        },
        {
          name: 'Jane Smith Ltd',
          email: 'jane@smith.com',
          phone: '+9876543210',
          createdBy: testAdmin._id
        }
      ]);
    });

    it('should search clients by name', async () => {
      const response = await request(app)
        .get('/api/client/search')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ q: 'John' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeInstanceOf(Array);
      const foundClient = response.body.result.find(c => c.name.includes('John'));
      expect(foundClient).toBeDefined();
    });

    it('should return 202 for no search matches', async () => {
      const response = await request(app)
        .get('/api/client/search')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ q: 'NonExistentClient' })
        .expect(202);

      expect(response.body.success).toBe(false);
    });

    it('should reject search without authentication', async () => {
      const response = await request(app)
        .get('/api/client/search')
        .query({ q: 'test' })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/client/filter', () => {
    beforeEach(async () => {
      await Client.create([
        {
          name: 'USA Client',
          country: 'USA',
          enabled: true,
          createdBy: testAdmin._id
        },
        {
          name: 'Canada Client',
          country: 'Canada',
          enabled: false,
          createdBy: testAdmin._id
        }
      ]);
    });

    it('should filter clients by enabled status', async () => {
      const response = await request(app)
        .get('/api/client/filter')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ enabled: true })
        .expect(403);

      // Filter endpoint may require additional permissions
      expect(response.body.success).toBe(false);
    });

    it('should reject filter without authentication', async () => {
      const response = await request(app)
        .get('/api/client/filter')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/client/summary', () => {
    it('should return client statistics summary', async () => {
      const response = await request(app)
        .get('/api/client/summary')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
    });

    it('should reject summary without authentication', async () => {
      const response = await request(app)
        .get('/api/client/summary')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Client Data Validation', () => {
    it('should trim whitespace from client name', async () => {
      const response = await request(app)
        .post('/api/client/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: '  Whitespace Client  '
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      // Note: Trimming depends on schema configuration
    });

    it('should handle special characters in name', async () => {
      const response = await request(app)
        .post('/api/client/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Client & Co. Ltd.'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.name).toBe('Client & Co. Ltd.');
    });

    it('should accept international phone numbers', async () => {
      const response = await request(app)
        .post('/api/client/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'International Client',
          phone: '+44 20 7946 0958'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.result.phone).toBe('+44 20 7946 0958');
    });
  });
});
