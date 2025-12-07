const mongoose = require('mongoose');
const Invoice = require('@/models/appModels/Invoice');
const Client = require('@/models/appModels/Client');
const Admin = require('@/models/coreModels/Admin');

describe('Invoice Model Tests', () => {
  let testClient;
  let testAdmin;

  beforeEach(async () => {
    // Create test client for invoice references
    testClient = await Client.create({
      removed: false,
      enabled: true,
      name: 'Test Client',
      email: 'testclient@invoice.com',
      phone: '1234567890',
    });

    // Create test admin for invoice creator
    testAdmin = await Admin.create({
      removed: false,
      enabled: true,
      email: 'admin@invoice.com',
      name: 'Test Admin',
    });
  });

  describe('Invoice Creation', () => {
    it('should create a valid invoice with required fields', async () => {
      const invoiceData = {
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
        total: 200,
        currency: 'USD',
      };

      const invoice = await Invoice.create(invoiceData);

      expect(invoice).toBeDefined();
      expect(invoice.number).toBe(1);
      expect(invoice.year).toBe(2024);
      // Check if client is populated (autopopulate) or just an ObjectId
      const clientId = invoice.client._id ? invoice.client._id.toString() : invoice.client.toString();
      expect(clientId).toBe(testClient._id.toString());
      expect(invoice.createdBy.toString()).toBe(testAdmin._id.toString());
      expect(invoice.items).toHaveLength(1);
      expect(invoice.items[0].itemName).toBe('Product A');
    });

    it('should fail to create invoice without required fields', async () => {
      const invalidInvoice = {
        content: 'Test invoice without required fields',
      };

      await expect(Invoice.create(invalidInvoice)).rejects.toThrow();
    });

    it('should fail to create invoice without number', async () => {
      const invoiceData = {
        createdBy: testAdmin._id,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
      };

      await expect(Invoice.create(invoiceData)).rejects.toThrow();
    });

    it('should fail to create invoice without client', async () => {
      const invoiceData = {
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };

      await expect(Invoice.create(invoiceData)).rejects.toThrow();
    });
  });

  describe('Invoice Default Values', () => {
    it('should set default removed to false', async () => {
      const invoice = await Invoice.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(invoice.removed).toBe(false);
    });

    it('should set default currency to NA', async () => {
      const invoice = await Invoice.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
      });

      expect(invoice.currency).toBe('NA');
    });

    it('should set default paymentStatus to unpaid', async () => {
      const invoice = await Invoice.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(invoice.paymentStatus).toBe('unpaid');
    });

    it('should set default status to draft', async () => {
      const invoice = await Invoice.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(invoice.status).toBe('draft');
    });

    it('should set default isOverdue to false', async () => {
      const invoice = await Invoice.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(invoice.isOverdue).toBe(false);
    });

    it('should set default approved to false', async () => {
      const invoice = await Invoice.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'USD',
      });

      expect(invoice.approved).toBe(false);
    });
  });

  describe('Invoice Items', () => {
    it('should create invoice with multiple items', async () => {
      const invoice = await Invoice.create({
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

      expect(invoice.items).toHaveLength(2);
      expect(invoice.items[0].itemName).toBe('Product A');
      expect(invoice.items[1].itemName).toBe('Product B');
      expect(invoice.total).toBe(350);
    });

    it('should require itemName in invoice items', async () => {
      const invoiceData = {
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

      await expect(Invoice.create(invoiceData)).rejects.toThrow();
    });
  });

  describe('Invoice Status Enum', () => {
    it('should accept valid status values', async () => {
      const validStatuses = ['draft', 'pending', 'sent', 'refunded', 'cancelled', 'on hold'];

      for (const status of validStatuses) {
        const invoice = await Invoice.create({
          createdBy: testAdmin._id,
          number: Math.floor(Math.random() * 10000),
          year: 2024,
          date: new Date(),
          expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          client: testClient._id,
          status,
          currency: 'USD',
        });

        expect(invoice.status).toBe(status);
      }
    });

    it('should reject invalid status values', async () => {
      const invoiceData = {
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        status: 'invalid_status',
        currency: 'USD',
      };

      await expect(Invoice.create(invoiceData)).rejects.toThrow();
    });
  });

  describe('Invoice Payment Status', () => {
    it('should accept valid paymentStatus values', async () => {
      const validPaymentStatuses = ['unpaid', 'paid', 'partially'];

      for (const paymentStatus of validPaymentStatuses) {
        const invoice = await Invoice.create({
          createdBy: testAdmin._id,
          number: Math.floor(Math.random() * 10000),
          year: 2024,
          date: new Date(),
          expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          client: testClient._id,
          paymentStatus,
          currency: 'USD',
        });

        expect(invoice.paymentStatus).toBe(paymentStatus);
      }
    });
  });

  describe('Invoice Currency', () => {
    it('should convert currency to uppercase', async () => {
      const invoice = await Invoice.create({
        createdBy: testAdmin._id,
        number: 1,
        year: 2024,
        date: new Date(),
        expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        client: testClient._id,
        currency: 'usd',
      });

      expect(invoice.currency).toBe('USD');
    });
  });

  describe('Invoice Recurring', () => {
    it('should accept valid recurring values', async () => {
      const validRecurring = ['daily', 'weekly', 'monthly', 'annually', 'quarter'];

      for (const recurring of validRecurring) {
        const invoice = await Invoice.create({
          createdBy: testAdmin._id,
          number: Math.floor(Math.random() * 10000),
          year: 2024,
          date: new Date(),
          expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          client: testClient._id,
          recurring,
          currency: 'USD',
        });

        expect(invoice.recurring).toBe(recurring);
      }
    });
  });
});
