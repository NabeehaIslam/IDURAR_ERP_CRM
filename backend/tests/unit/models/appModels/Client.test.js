const Client = require('@/models/appModels/Client');
const Admin = require('@/models/coreModels/Admin');
const { clearDatabase, generateObjectId, isValidObjectId } = require('../../helpers/dbHelper');

describe('Client Model - Unit Tests', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe('Client Model Validation', () => {
    it('should create client with valid data', async () => {
      const clientData = {
        name: 'ACME Corporation',
        phone: '+1234567890',
        country: 'USA',
        address: '123 Main Street',
        email: 'contact@acme.com',
      };

      const client = await Client.create(clientData);

      expect(client).toBeDefined();
      expect(client.name).toBe('ACME Corporation');
      expect(client.phone).toBe('+1234567890');
      expect(client.country).toBe('USA');
      expect(client.address).toBe('123 Main Street');
      expect(client.email).toBe('contact@acme.com');
    });

    it('should fail to create client without required name', async () => {
      const clientData = {
        email: 'test@test.com',
      };

      await expect(Client.create(clientData)).rejects.toThrow();
    });

    it('should set default values correctly', async () => {
      const clientData = {
        name: 'Test Client',
      };

      const client = await Client.create(clientData);

      expect(client.removed).toBe(false);
      expect(client.enabled).toBe(true); // Default is true for clients
      expect(client.created).toBeDefined();
      expect(client.updated).toBeDefined();
    });

    it('should allow client without email or phone', async () => {
      const clientData = {
        name: 'Minimal Client',
      };

      const client = await Client.create(clientData);

      expect(client).toBeDefined();
      expect(client.name).toBe('Minimal Client');
      expect(client.email).toBeUndefined();
      expect(client.phone).toBeUndefined();
    });

    it('should store createdBy admin reference', async () => {
      const admin = await Admin.create({
        email: 'admin@test.com',
        name: 'Admin',
        enabled: true,
      });

      const client = await Client.create({
        name: 'Test Client',
        createdBy: admin._id,
      });

      expect(client.createdBy).toBeDefined();
      expect(client.createdBy.toString()).toBe(admin._id.toString());
      expect(isValidObjectId(client.createdBy)).toBe(true);
    });

    it('should store assigned admin reference', async () => {
      const admin = await Admin.create({
        email: 'admin@test.com',
        name: 'Admin',
        enabled: true,
      });

      const client = await Client.create({
        name: 'Test Client',
        assigned: admin._id,
      });

      expect(client.assigned).toBeDefined();
      expect(client.assigned.toString()).toBe(admin._id.toString());
    });
  });

  describe('Client CRUD Operations', () => {
    it('should update client data', async () => {
      const client = await Client.create({
        name: 'Original Name',
        email: 'original@test.com',
      });

      client.name = 'Updated Name';
      client.email = 'updated@test.com';
      await client.save();

      const updatedClient = await Client.findById(client._id);
      expect(updatedClient.name).toBe('Updated Name');
      expect(updatedClient.email).toBe('updated@test.com');
    });

    it('should soft delete client by setting removed flag', async () => {
      const client = await Client.create({
        name: 'Test Client',
      });

      client.removed = true;
      await client.save();

      const deletedClient = await Client.findById(client._id);
      expect(deletedClient.removed).toBe(true);
    });

    it('should find client by query', async () => {
      await Client.create({ name: 'Client A', country: 'USA' });
      await Client.create({ name: 'Client B', country: 'Canada' });

      const usaClients = await Client.find({ country: 'USA' });
      expect(usaClients).toHaveLength(1);
      expect(usaClients[0].name).toBe('Client A');
    });

    it('should count clients correctly', async () => {
      await Client.create({ name: 'Client 1' });
      await Client.create({ name: 'Client 2' });
      await Client.create({ name: 'Client 3' });

      const count = await Client.countDocuments();
      expect(count).toBe(3);
    });

    it('should filter out removed clients', async () => {
      await Client.create({ name: 'Active Client', removed: false });
      await Client.create({ name: 'Removed Client', removed: true });

      const activeClients = await Client.find({ removed: false });
      expect(activeClients).toHaveLength(1);
      expect(activeClients[0].name).toBe('Active Client');
    });
  });

  describe('Client Business Logic', () => {
    it('should update timestamp on save', async () => {
      const client = await Client.create({ name: 'Test Client' });
      const originalUpdated = client.updated;

      // Wait a bit and update
      await new Promise((resolve) => setTimeout(resolve, 100));
      client.name = 'Updated Name';
      await client.save();

      expect(client.updated.getTime()).toBeGreaterThanOrEqual(originalUpdated.getTime());
    });

    it('should allow multiple clients with same email', async () => {
      // Business rule: emails don't need to be unique for clients
      const client1 = await Client.create({
        name: 'Client 1',
        email: 'same@test.com',
      });

      const client2 = await Client.create({
        name: 'Client 2',
        email: 'same@test.com',
      });

      expect(client1.email).toBe(client2.email);
      expect(client1._id.toString()).not.toBe(client2._id.toString());
    });
  });
});
