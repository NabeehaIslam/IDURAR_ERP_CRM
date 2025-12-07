const mongoose = require('mongoose');
const Quote = require('@/models/appModels/Quote');
const Client = require('@/models/appModels/Client');
const Admin = require('@/models/coreModels/Admin');

describe('Quote Model Tests', () => {
  let testClient;
  let testAdmin;

  beforeEach(async () => {
    // Create test client for quote references
    testClient = await Client.create({
      removed: false,
      enabled: true,
      name: 'Test Client',
      email: 'testclient@quote.com',
      phone: '1234567890',
    });

    // Create test admin for quote creator
    testAdmin = await Admin.create({
      removed: false,
      enabled: true,
      email: 'admin@quote.com',
      name: 'Test Admin',
    });
  });

  describe('Quote Creation', () => {
    it('should create a valid quote with required fields', async () => {
      const quoteData = {
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        client: testClient._id,
        items: [
          {
            itemName: 'Product A',
            description: 'Test product',
            quantity: 2,
            price: 100,
            total: 200,
          },
        ],
        currency: 'USD',
      };

      const quote = await Quote.create(quoteData);

      expect(quote).toBeDefined();
      expect(quote.number).toBe(1);
      expect(quote.year).toBe(2024);
      // Check if client is populated (autopopulate) or just an ObjectId
      const clientId = quote.client._id ? quote.client._id.toString() : quote.client.toString();
      expect(clientId).toBe(testClient._id.toString());
      expect(quote.createdBy.toString()).toBe(testAdmin._id.toString());
      expect(quote.items).toHaveLength(1);
      expect(quote.items[0].itemName).toBe('Product A');
    });

    it('should fail to create quote without required fields', async () => {
      const invalidQuote = {
        content: 'Test quote without required fields',
      };

      await expect(Quote.create(invalidQuote)).rejects.toThrow();
    });

    it('should fail to create quote without number', async () => {
      const quoteData = {
        createdBy: testAdmin._id,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
      };

      await expect(Quote.create(quoteData)).rejects.toThrow();
    });

    it('should fail to create quote without client', async () => {
      const quoteData = {
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };

      await expect(Quote.create(quoteData)).rejects.toThrow();
    });
  });

  describe('Quote Default Values', () => {
    it('should set default removed to false', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(quote.removed).toBe(false);
    });

    it('should set default converted to false', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(quote.converted).toBe(false);
    });

    it('should set default currency to NA', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
      });

      expect(quote.currency).toBe('NA');
    });

    it('should set default status to draft', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(quote.status).toBe('draft');
    });

    it('should set default approved to false', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(quote.approved).toBe(false);
    });

    it('should set default isExpired to false', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(quote.isExpired).toBe(false);
    });

    it('should set default discount to 0', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(quote.discount).toBe(0);
    });

    it('should set default credit to 0', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(quote.credit).toBe(0);
    });
  });

  describe('Quote Items', () => {
    it('should create quote with multiple items', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        items: [
          {
            itemName: 'Product A',
            quantity: 2,
            price: 100,
            total: 200,
          },
          {
            itemName: 'Product B',
            quantity: 1,
            price: 150,
            total: 150,
          },
        ],
        total: 350,
        currency: 'USD',
      });

      expect(quote.items).toHaveLength(2);
      expect(quote.items[0].itemName).toBe('Product A');
      expect(quote.items[1].itemName).toBe('Product B');
    });

    it('should require itemName in quote items', async () => {
      const quoteData = {
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        items: [
          {
            quantity: 2,
            price: 100,
            total: 200,
          },
        ],
        currency: 'USD',
      };

      await expect(Quote.create(quoteData)).rejects.toThrow();
    });

    it('should require quantity in quote items', async () => {
      const quoteData = {
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        items: [
          {
            itemName: 'Product A',
            price: 100,
            total: 200,
          },
        ],
        currency: 'USD',
      };

      await expect(Quote.create(quoteData)).rejects.toThrow();
    });

    it('should require price in quote items', async () => {
      const quoteData = {
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        items: [
          {
            itemName: 'Product A',
            quantity: 2,
            total: 200,
          },
        ],
        currency: 'USD',
      };

      await expect(Quote.create(quoteData)).rejects.toThrow();
    });
  });

  describe('Quote Status Enum', () => {
    it('should accept valid status values', async () => {
      const validStatuses = ['draft', 'pending', 'sent', 'accepted', 'declined', 'cancelled', 'on hold'];

      for (const status of validStatuses) {
        const quote = await Quote.create({
          createdBy: testAdmin._id,
          number: Math.floor(Math.random() * 10000),
          year: 2024,
          date: new Date(),
          expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          client: testClient._id,
          status,
          currency: 'USD',
        });

        expect(quote.status).toBe(status);
      }
    });

    it('should reject invalid status values', async () => {
      const quoteData = {
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        status: 'invalid_status',
        currency: 'USD',
      };

      await expect(Quote.create(quoteData)).rejects.toThrow();
    });
  });

  describe('Quote Currency', () => {
    it('should convert currency to uppercase', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'usd',
      });

      expect(quote.currency).toBe('USD');
    });
  });

  describe('Quote CRUD Operations', () => {
    it('should find quote by id', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      const foundQuote = await Quote.findById(quote._id);
      expect(foundQuote).toBeDefined();
      expect(foundQuote._id.toString()).toBe(quote._id.toString());
    });

    it('should update quote status', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      quote.status = 'sent';
      await quote.save();

      const updatedQuote = await Quote.findById(quote._id);
      expect(updatedQuote.status).toBe('sent');
    });

    it('should mark quote as converted', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      quote.converted = true;
      await quote.save();

      const convertedQuote = await Quote.findById(quote._id);
      expect(convertedQuote.converted).toBe(true);
    });

    it('should soft delete quote by setting removed flag', async () => {
      const quote = await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      quote.removed = true;
      await quote.save();

      const deletedQuote = await Quote.findById(quote._id);
      expect(deletedQuote.removed).toBe(true);
    });

    it('should count quotes for a client', async () => {
      await Quote.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      await Quote.create({
        createdBy: testAdmin._id,
        number: 2,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      const count = await Quote.countDocuments({ client: testClient._id, removed: false });
      expect(count).toBe(2);
    });
  });
});
