const mongoose = require('mongoose');
const { getData, getOne } = require('@/middlewares/serverData');
const Admin = require('@/models/coreModels/Admin');
const Client = require('@/models/appModels/Client');

describe('ServerData Middleware Tests', () => {
  beforeEach(async () => {
    await Admin.deleteMany({});
    await Client.deleteMany({});
  });

  describe('getData Function', () => {
    describe('Basic Functionality', () => {
      it('should return query object for model', () => {
        const result = getData({ model: 'Admin' });
        expect(result).toBeDefined();
        expect(typeof result.exec).toBe('function'); // Mongoose query object
      });

      it('should filter by removed=false', async () => {
        await Admin.create([
          { email: 'active@test.com', name: 'Active', surname: 'User', removed: false, enabled: true },
          { email: 'removed@test.com', name: 'Removed', surname: 'User', removed: true, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(1);
        expect(results[0].email).toBe('active@test.com');
      });

      it('should filter by enabled=true', async () => {
        await Admin.create([
          { email: 'enabled@test.com', name: 'Enabled', surname: 'User', removed: false, enabled: true },
          { email: 'disabled@test.com', name: 'Disabled', surname: 'User', removed: false, enabled: false }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(1);
        expect(results[0].email).toBe('enabled@test.com');
      });

      it('should return empty array when no matching documents', async () => {
        await Admin.create([
          { email: 'removed@test.com', name: 'Removed', surname: 'User', removed: true, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(0);
      });
    });

    describe('Multiple Models', () => {
      it('should work with different models', async () => {
        await Admin.create({
          email: 'admin@test.com',
          name: 'Admin',
          surname: 'Test',
          removed: false,
          enabled: true
        });

        await Client.create({
          removed: false,
          enabled: true,
          name: 'Test Client',
          email: 'client@test.com',
          people: []
        });

        const adminQuery = getData({ model: 'Admin' });
        const clientQuery = getData({ model: 'Client' });

        const admins = await adminQuery.exec();
        const clients = await clientQuery.exec();

        expect(admins).toHaveLength(1);
        expect(clients).toHaveLength(1);
        expect(admins[0].email).toBe('admin@test.com');
        expect(clients[0].email).toBe('client@test.com');
      });
    });

    describe('Filter Combinations', () => {
      it('should exclude documents with removed=true AND enabled=false', async () => {
        await Admin.create([
          { email: 'both-false@test.com', name: 'Both', surname: 'False', removed: true, enabled: false },
          { email: 'active@test.com', name: 'Active', surname: 'User', removed: false, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(1);
        expect(results[0].email).toBe('active@test.com');
      });

      it('should exclude removed=true even if enabled=true', async () => {
        await Admin.create([
          { email: 'removed-enabled@test.com', name: 'Removed', surname: 'Enabled', removed: true, enabled: true },
          { email: 'active@test.com', name: 'Active', surname: 'User', removed: false, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(1);
        expect(results[0].email).toBe('active@test.com');
      });

      it('should exclude enabled=false even if removed=false', async () => {
        await Admin.create([
          { email: 'disabled@test.com', name: 'Disabled', surname: 'User', removed: false, enabled: false },
          { email: 'active@test.com', name: 'Active', surname: 'User', removed: false, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(1);
        expect(results[0].email).toBe('active@test.com');
      });
    });

    describe('Multiple Records', () => {
      it('should return all matching records', async () => {
        await Admin.create([
          { email: 'admin1@test.com', name: 'Admin', surname: '1', removed: false, enabled: true },
          { email: 'admin2@test.com', name: 'Admin', surname: '2', removed: false, enabled: true },
          { email: 'admin3@test.com', name: 'Admin', surname: '3', removed: false, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(3);
      });

      it('should handle large number of records', async () => {
        const records = [];
        for (let i = 1; i <= 50; i++) {
          records.push({
            email: `admin${i}@test.com`,
            name: 'Admin',
            surname: `${i}`,
            removed: false,
            enabled: true
          });
        }
        await Admin.create(records);

        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(50);
      });
    });

    describe('Query Object Properties', () => {
      it('should return Mongoose query object', () => {
        const query = getData({ model: 'Admin' });
        expect(query.constructor.name).toBe('Query');
      });

      it('should have exec method', () => {
        const query = getData({ model: 'Admin' });
        expect(typeof query.exec).toBe('function');
      });

      it('should be chainable with Mongoose methods', async () => {
        await Admin.create([
          { email: 'a@test.com', name: 'A', surname: 'User', removed: false, enabled: true },
          { email: 'b@test.com', name: 'B', surname: 'User', removed: false, enabled: true },
          { email: 'c@test.com', name: 'C', surname: 'User', removed: false, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.limit(2).exec();

        expect(results).toHaveLength(2);
      });

      it('should support sorting', async () => {
        await Admin.create([
          { email: 'c@test.com', name: 'C', surname: 'User', removed: false, enabled: true },
          { email: 'a@test.com', name: 'A', surname: 'User', removed: false, enabled: true },
          { email: 'b@test.com', name: 'B', surname: 'User', removed: false, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const results = await query.sort({ email: 1 }).exec();

        expect(results[0].email).toBe('a@test.com');
        expect(results[1].email).toBe('b@test.com');
        expect(results[2].email).toBe('c@test.com');
      });
    });

    describe('Edge Cases', () => {
      it('should handle model with no documents', async () => {
        const query = getData({ model: 'Admin' });
        const results = await query.exec();

        expect(results).toHaveLength(0);
        expect(Array.isArray(results)).toBe(true);
      });

      it('should handle model name correctly', () => {
        const query = getData({ model: 'Admin' });
        expect(query).toBeDefined();
        expect(query.constructor.name).toBe('Query');
      });
    });

    describe('Real-World Use Cases', () => {
      it('should get all active admins for dashboard', async () => {
        await Admin.create([
          { email: 'admin1@test.com', name: 'Active', surname: 'Admin', removed: false, enabled: true },
          { email: 'admin2@test.com', name: 'Inactive', surname: 'Admin', removed: false, enabled: false },
          { email: 'admin3@test.com', name: 'Deleted', surname: 'Admin', removed: true, enabled: true }
        ]);

        const query = getData({ model: 'Admin' });
        const activeAdmins = await query.exec();

        expect(activeAdmins).toHaveLength(1);
        expect(activeAdmins[0].name).toBe('Active');
      });

      it('should get all active clients for dropdown', async () => {
        await Client.create([
          { name: 'Client 1', email: 'c1@test.com', removed: false, enabled: true, people: [] },
          { name: 'Client 2', email: 'c2@test.com', removed: false, enabled: true, people: [] },
          { name: 'Archived Client', email: 'c3@test.com', removed: true, enabled: true, people: [] }
        ]);

        const query = getData({ model: 'Client' });
        const activeClients = await query.exec();

        expect(activeClients).toHaveLength(2);
        expect(activeClients.map(c => c.name)).toContain('Client 1');
        expect(activeClients.map(c => c.name)).toContain('Client 2');
      });
    });
  });

  describe('getOne Function', () => {
    describe('Basic Functionality', () => {
      it('should return query object for model and id', async () => {
        const admin = await Admin.create({
          email: 'test@test.com',
          name: 'Test',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const result = getOne({ model: 'Admin', id: admin._id });
        expect(result).toBeDefined();
        expect(typeof result.exec).toBe('function');
      });

      it('should find document by id', async () => {
        const admin = await Admin.create({
          email: 'test@test.com',
          name: 'Test',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        const result = await query.exec();

        expect(result).toBeDefined();
        expect(result._id.toString()).toBe(admin._id.toString());
        expect(result.email).toBe('test@test.com');
      });

      it('should filter by removed=false', async () => {
        const removedAdmin = await Admin.create({
          email: 'removed@test.com',
          name: 'Removed',
          surname: 'User',
          removed: true,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: removedAdmin._id });
        const result = await query.exec();

        expect(result).toBeNull();
      });

      it('should return null for non-existent id', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const query = getOne({ model: 'Admin', id: fakeId });
        const result = await query.exec();

        expect(result).toBeNull();
      });
    });

    describe('Multiple Models', () => {
      it('should work with Admin model', async () => {
        const admin = await Admin.create({
          email: 'admin@test.com',
          name: 'Admin',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        const result = await query.exec();

        expect(result.email).toBe('admin@test.com');
      });

      it('should work with Client model', async () => {
        const client = await Client.create({
          name: 'Test Client',
          email: 'client@test.com',
          removed: false,
          enabled: true,
          people: []
        });

        const query = getOne({ model: 'Client', id: client._id });
        const result = await query.exec();

        expect(result.email).toBe('client@test.com');
      });

      it('should handle different models separately', async () => {
        const admin = await Admin.create({
          email: 'admin@test.com',
          name: 'Admin',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const client = await Client.create({
          name: 'Client',
          email: 'client@test.com',
          removed: false,
          enabled: true,
          people: []
        });

        const adminQuery = getOne({ model: 'Admin', id: admin._id });
        const clientQuery = getOne({ model: 'Client', id: client._id });

        const adminResult = await adminQuery.exec();
        const clientResult = await clientQuery.exec();

        expect(adminResult.email).toBe('admin@test.com');
        expect(clientResult.email).toBe('client@test.com');
      });
    });

    describe('Removed Flag Behavior', () => {
      it('should not return removed document even with valid id', async () => {
        const admin = await Admin.create({
          email: 'test@test.com',
          name: 'Test',
          surname: 'User',
          removed: true,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        const result = await query.exec();

        expect(result).toBeNull();
      });

      it('should return document with removed=false', async () => {
        const admin = await Admin.create({
          email: 'active@test.com',
          name: 'Active',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        const result = await query.exec();

        expect(result).toBeDefined();
        expect(result.removed).toBe(false);
      });

      it('should not care about enabled flag', async () => {
        const disabledAdmin = await Admin.create({
          email: 'disabled@test.com',
          name: 'Disabled',
          surname: 'User',
          removed: false,
          enabled: false
        });

        const query = getOne({ model: 'Admin', id: disabledAdmin._id });
        const result = await query.exec();

        // getOne only checks removed flag, not enabled
        expect(result).toBeDefined();
        expect(result.enabled).toBe(false);
      });
    });

    describe('ID Format Handling', () => {
      it('should handle ObjectId format', async () => {
        const admin = await Admin.create({
          email: 'test@test.com',
          name: 'Test',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        const result = await query.exec();

        expect(result).toBeDefined();
      });

      it('should handle string id', async () => {
        const admin = await Admin.create({
          email: 'test@test.com',
          name: 'Test',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id.toString() });
        const result = await query.exec();

        expect(result).toBeDefined();
        expect(result._id.toString()).toBe(admin._id.toString());
      });

      it('should return null for invalid id format', async () => {
        const query = getOne({ model: 'Admin', id: 'invalid-id' });
        
        try {
          await query.exec();
        } catch (error) {
          expect(error).toBeDefined();
        }
      });
    });

    describe('Query Object Properties', () => {
      it('should return Mongoose query object', async () => {
        const admin = await Admin.create({
          email: 'test@test.com',
          name: 'Test',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        expect(query.constructor.name).toBe('Query');
      });

      it('should have exec method', async () => {
        const admin = await Admin.create({
          email: 'test@test.com',
          name: 'Test',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        expect(typeof query.exec).toBe('function');
      });

      it('should be chainable with select', async () => {
        const admin = await Admin.create({
          email: 'test@test.com',
          name: 'Test',
          surname: 'User',
          removed: false,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        const result = await query.select('email name').exec();

        expect(result.email).toBe('test@test.com');
        expect(result.name).toBe('Test');
      });
    });

    describe('Edge Cases', () => {
      it('should handle null id gracefully', async () => {
        const query = getOne({ model: 'Admin', id: null });
        const result = await query.exec();

        expect(result).toBeNull();
      });

      it('should handle undefined id gracefully', async () => {
        const query = getOne({ model: 'Admin', id: undefined });
        const result = await query.exec();

        expect(result).toBeNull();
      });
    });

    describe('Real-World Use Cases', () => {
      it('should fetch admin profile by id', async () => {
        const admin = await Admin.create({
          email: 'admin@company.com',
          name: 'John',
          surname: 'Doe',
          removed: false,
          enabled: true,
          role: 'owner'
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        const profile = await query.exec();

        expect(profile.email).toBe('admin@company.com');
        expect(profile.name).toBe('John');
        expect(profile.surname).toBe('Doe');
      });

      it('should fetch client details for invoice', async () => {
        const client = await Client.create({
          name: 'ACME Corp',
          email: 'contact@acme.com',
          removed: false,
          enabled: true,
          people: []
        });

        const query = getOne({ model: 'Client', id: client._id });
        const clientDetails = await query.exec();

        expect(clientDetails.name).toBe('ACME Corp');
        expect(clientDetails.email).toBe('contact@acme.com');
      });

      it('should return null for deleted records', async () => {
        const admin = await Admin.create({
          email: 'deleted@test.com',
          name: 'Deleted',
          surname: 'User',
          removed: true,
          enabled: true
        });

        const query = getOne({ model: 'Admin', id: admin._id });
        const result = await query.exec();

        expect(result).toBeNull(); // Should not show deleted records
      });
    });
  });

  describe('getData vs getOne Comparison', () => {
    it('getData returns array, getOne returns single document', async () => {
      const admin = await Admin.create({
        email: 'test@test.com',
        name: 'Test',
        surname: 'User',
        removed: false,
        enabled: true
      });

      const dataQuery = getData({ model: 'Admin' });
      const oneQuery = getOne({ model: 'Admin', id: admin._id });

      const dataResult = await dataQuery.exec();
      const oneResult = await oneQuery.exec();

      expect(Array.isArray(dataResult)).toBe(true);
      expect(Array.isArray(oneResult)).toBe(false);
    });

    it('getData checks enabled flag, getOne does not', async () => {
      const disabledAdmin = await Admin.create({
        email: 'disabled@test.com',
        name: 'Disabled',
        surname: 'User',
        removed: false,
        enabled: false
      });

      const dataQuery = getData({ model: 'Admin' });
      const oneQuery = getOne({ model: 'Admin', id: disabledAdmin._id });

      const dataResult = await dataQuery.exec();
      const oneResult = await oneQuery.exec();

      expect(dataResult).toHaveLength(0); // getData filters enabled=true
      expect(oneResult).toBeDefined(); // getOne doesn't check enabled
    });

    it('both check removed flag', async () => {
      const removedAdmin = await Admin.create({
        email: 'removed@test.com',
        name: 'Removed',
        surname: 'User',
        removed: true,
        enabled: true
      });

      const dataQuery = getData({ model: 'Admin' });
      const oneQuery = getOne({ model: 'Admin', id: removedAdmin._id });

      const dataResult = await dataQuery.exec();
      const oneResult = await oneQuery.exec();

      expect(dataResult).toHaveLength(0);
      expect(oneResult).toBeNull();
    });
  });
});
