const mongoose = require('mongoose');
const PaymentMode = require('@/models/appModels/PaymentMode');

describe('PaymentMode Model Tests', () => {
  describe('PaymentMode Creation', () => {
    it('should create a valid payment mode with required fields', async () => {
      const paymentModeData = {
        name: 'Credit Card',
        description: 'Payment via credit card',
      };

      const paymentMode = await PaymentMode.create(paymentModeData);

      expect(paymentMode).toBeDefined();
      expect(paymentMode.name).toBe('Credit Card');
      expect(paymentMode.description).toBe('Payment via credit card');
    });

    it('should fail to create payment mode without name', async () => {
      const invalidPaymentMode = {
        description: 'Payment mode without name',
      };

      await expect(PaymentMode.create(invalidPaymentMode)).rejects.toThrow();
    });

    it('should fail to create payment mode without description', async () => {
      const invalidPaymentMode = {
        name: 'Credit Card',
      };

      await expect(PaymentMode.create(invalidPaymentMode)).rejects.toThrow();
    });

    it('should fail to create payment mode without required fields', async () => {
      const invalidPaymentMode = {
        ref: 'REF-001',
      };

      await expect(PaymentMode.create(invalidPaymentMode)).rejects.toThrow();
    });
  });

  describe('PaymentMode Default Values', () => {
    it('should set default removed to false', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      expect(paymentMode.removed).toBe(false);
    });

    it('should set default enabled to true', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      expect(paymentMode.enabled).toBe(true);
    });

    it('should set default isDefault to false', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      expect(paymentMode.isDefault).toBe(false);
    });

    it('should set created timestamp', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      expect(paymentMode.created).toBeInstanceOf(Date);
    });
  });

  describe('PaymentMode Optional Fields', () => {
    it('should create payment mode with reference', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
        ref: 'CC-001',
      });

      expect(paymentMode.ref).toBe('CC-001');
    });

    it('should create payment mode with isDefault set to true', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
        isDefault: true,
      });

      expect(paymentMode.isDefault).toBe(true);
    });

    it('should create payment mode with enabled set to false', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
        enabled: false,
      });

      expect(paymentMode.enabled).toBe(false);
    });

    it('should create payment mode with removed set to true', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
        removed: true,
      });

      expect(paymentMode.removed).toBe(true);
    });
  });

  describe('PaymentMode CRUD Operations', () => {
    it('should find payment mode by id', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      const foundPaymentMode = await PaymentMode.findById(paymentMode._id);
      expect(foundPaymentMode).toBeDefined();
      expect(foundPaymentMode._id.toString()).toBe(paymentMode._id.toString());
      expect(foundPaymentMode.name).toBe('Credit Card');
    });

    it('should update payment mode name', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      paymentMode.name = 'Debit Card';
      await paymentMode.save();

      const updatedPaymentMode = await PaymentMode.findById(paymentMode._id);
      expect(updatedPaymentMode.name).toBe('Debit Card');
    });

    it('should update payment mode description', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      paymentMode.description = 'Payment via debit or credit card';
      await paymentMode.save();

      const updatedPaymentMode = await PaymentMode.findById(paymentMode._id);
      expect(updatedPaymentMode.description).toBe('Payment via debit or credit card');
    });

    it('should soft delete payment mode by setting removed flag', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      paymentMode.removed = true;
      await paymentMode.save();

      const deletedPaymentMode = await PaymentMode.findById(paymentMode._id);
      expect(deletedPaymentMode.removed).toBe(true);
    });

    it('should disable payment mode by setting enabled flag', async () => {
      const paymentMode = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      paymentMode.enabled = false;
      await paymentMode.save();

      const disabledPaymentMode = await PaymentMode.findById(paymentMode._id);
      expect(disabledPaymentMode.enabled).toBe(false);
    });

    it('should count active payment modes', async () => {
      await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      await PaymentMode.create({
        name: 'Cash',
        description: 'Cash payment',
      });

      await PaymentMode.create({
        name: 'Bank Transfer',
        description: 'Bank transfer payment',
        enabled: false,
      });

      const count = await PaymentMode.countDocuments({ removed: false, enabled: true });
      expect(count).toBe(2);
    });

    it('should find all payment modes', async () => {
      await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
      });

      await PaymentMode.create({
        name: 'Cash',
        description: 'Cash payment',
      });

      const paymentModes = await PaymentMode.find({ removed: false });
      expect(paymentModes).toHaveLength(2);
    });

    it('should find default payment mode', async () => {
      await PaymentMode.create({
        name: 'Credit Card',
        description: 'Payment via credit card',
        isDefault: true,
      });

      await PaymentMode.create({
        name: 'Cash',
        description: 'Cash payment',
      });

      const defaultPaymentMode = await PaymentMode.findOne({ isDefault: true, removed: false });
      expect(defaultPaymentMode).toBeDefined();
      expect(defaultPaymentMode.name).toBe('Credit Card');
    });
  });

  describe('PaymentMode Name Validation', () => {
    it('should create payment modes with different names', async () => {
      const names = ['Credit Card', 'Debit Card', 'Cash', 'Bank Transfer', 'PayPal', 'Crypto'];

      for (const name of names) {
        const paymentMode = await PaymentMode.create({
          name,
          description: `Payment via ${name}`,
        });

        expect(paymentMode.name).toBe(name);
      }
    });

    it('should allow duplicate names (no unique constraint)', async () => {
      await PaymentMode.create({
        name: 'Credit Card',
        description: 'First credit card',
      });

      const duplicate = await PaymentMode.create({
        name: 'Credit Card',
        description: 'Second credit card',
      });

      expect(duplicate).toBeDefined();
      expect(duplicate.name).toBe('Credit Card');
    });
  });
});
