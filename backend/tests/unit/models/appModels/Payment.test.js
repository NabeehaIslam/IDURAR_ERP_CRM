const mongoose = require('mongoose');
const Payment = require('@/models/appModels/Payment');
const Client = require('@/models/appModels/Client');
const Invoice = require('@/models/appModels/Invoice');
const Admin = require('@/models/coreModels/Admin');
const PaymentMode = require('@/models/appModels/PaymentMode');

describe('Payment Model Tests', () => {
  let testClient;
  let testInvoice;
  let testAdmin;
  let testPaymentMode;

  beforeEach(async () => {
    // Create test admin
    testAdmin = await Admin.create({
      removed: false,
      enabled: true,
      email: 'admin@payment.com',
      name: 'Test Admin',
    });

    // Create test client
    testClient = await Client.create({
      removed: false,
      enabled: true,
      name: 'Test Client',
      email: 'testclient@payment.com',
      phone: '1234567890',
    });

    // Create test invoice
    testInvoice = await Invoice.create({
      createdBy: testAdmin._id,
      number: 1,
      year: 2024,
      date: new Date(),
      expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      client: testClient._id,
      currency: 'USD',
      total: 1000,
    });

    // Create test payment mode
    testPaymentMode = await PaymentMode.create({
      name: 'Credit Card',
      description: 'Payment via credit card',
    });
  });

  describe('Payment Creation', () => {
    it('should create a valid payment with required fields', async () => {
      const paymentData = {
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      };

      const payment = await Payment.create(paymentData);

      expect(payment).toBeDefined();
      expect(payment.number).toBe(1);
      expect(payment.amount).toBe(500);
      expect(payment.currency).toBe('USD');
      // Check if client is populated (autopopulate) or just an ObjectId
      const clientId = payment.client._id ? payment.client._id.toString() : payment.client.toString();
      expect(clientId).toBe(testClient._id.toString());
      // Check if invoice is populated (autopopulate) or just an ObjectId
      const invoiceId = payment.invoice._id ? payment.invoice._id.toString() : payment.invoice.toString();
      expect(invoiceId).toBe(testInvoice._id.toString());
    });

    it('should fail to create payment without required fields', async () => {
      const invalidPayment = {
        description: 'Payment without required fields',
      };

      await expect(Payment.create(invalidPayment)).rejects.toThrow();
    });

    it('should fail to create payment without number', async () => {
      const paymentData = {
        createdBy: testAdmin._id,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      };

      await expect(Payment.create(paymentData)).rejects.toThrow();
    });

    it('should fail to create payment without client', async () => {
      const paymentData = {
        createdBy: testAdmin._id,
        number: 1,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      };

      await expect(Payment.create(paymentData)).rejects.toThrow();
    });

    it('should fail to create payment without invoice', async () => {
      const paymentData = {
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        amount: 500,
        currency: 'USD',
      };

      await expect(Payment.create(paymentData)).rejects.toThrow();
    });

    it('should fail to create payment without amount', async () => {
      const paymentData = {
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        currency: 'USD',
      };

      await expect(Payment.create(paymentData)).rejects.toThrow();
    });
  });

  describe('Payment Default Values', () => {
    it('should set default removed to false', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      });

      expect(payment.removed).toBe(false);
    });

    it('should set default currency to NA', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
      });

      expect(payment.currency).toBe('NA');
    });

    it('should set default date to current date', async () => {
      const beforeCreate = new Date();
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      });
      const afterCreate = new Date();

      expect(payment.date).toBeInstanceOf(Date);
      expect(payment.date.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(payment.date.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });

    it('should set created timestamp', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      });

      expect(payment.created).toBeInstanceOf(Date);
    });

    it('should set updated timestamp', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      });

      expect(payment.updated).toBeInstanceOf(Date);
    });
  });

  describe('Payment Currency', () => {
    it('should convert currency to uppercase', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'usd',
      });

      expect(payment.currency).toBe('USD');
    });

    it('should handle different currency codes', async () => {
      const currencies = ['eur', 'gbp', 'jpy'];

      for (const currency of currencies) {
        const payment = await Payment.create({
          createdBy: testAdmin._id,
          number: Math.floor(Math.random() * 10000),
          client: testClient._id,
          invoice: testInvoice._id,
          amount: 500,
          currency,
        });

        expect(payment.currency).toBe(currency.toUpperCase());
      }
    });
  });

  describe('Payment with Payment Mode', () => {
    it('should create payment with payment mode', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
        paymentMode: testPaymentMode._id,
      });

      expect(payment.paymentMode).toBeDefined();
      // Check if paymentMode is populated (autopopulate) or just an ObjectId
      const paymentModeId = payment.paymentMode._id ? payment.paymentMode._id.toString() : payment.paymentMode.toString();
      expect(paymentModeId).toBe(testPaymentMode._id.toString());
    });

    it('should create payment without payment mode (optional field)', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      });

      expect(payment.paymentMode).toBeUndefined();
    });
  });

  describe('Payment Optional Fields', () => {
    it('should create payment with reference number', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
        ref: 'REF-12345',
      });

      expect(payment.ref).toBe('REF-12345');
    });

    it('should create payment with description', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
        description: 'Partial payment for invoice',
      });

      expect(payment.description).toBe('Partial payment for invoice');
    });

    it('should create payment with custom date', async () => {
      const customDate = new Date('2024-01-01');
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
        date: customDate,
      });

      expect(payment.date.toISOString()).toBe(customDate.toISOString());
    });
  });

  describe('Payment CRUD Operations', () => {
    it('should find payment by id', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      });

      const foundPayment = await Payment.findById(payment._id);
      expect(foundPayment).toBeDefined();
      expect(foundPayment._id.toString()).toBe(payment._id.toString());
    });

    it('should update payment amount', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      });

      payment.amount = 750;
      await payment.save();

      const updatedPayment = await Payment.findById(payment._id);
      expect(updatedPayment.amount).toBe(750);
    });

    it('should soft delete payment by setting removed flag', async () => {
      const payment = await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 500,
        currency: 'USD',
      });

      payment.removed = true;
      await payment.save();

      const deletedPayment = await Payment.findById(payment._id);
      expect(deletedPayment.removed).toBe(true);
    });

    it('should count payments for an invoice', async () => {
      await Payment.create({
        createdBy: testAdmin._id,
        number: 1,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 300,
        currency: 'USD',
      });

      await Payment.create({
        createdBy: testAdmin._id,
        number: 2,
        client: testClient._id,
        invoice: testInvoice._id,
        amount: 200,
        currency: 'USD',
      });

      const count = await Payment.countDocuments({ invoice: testInvoice._id, removed: false });
      expect(count).toBe(2);
    });
  });
});
