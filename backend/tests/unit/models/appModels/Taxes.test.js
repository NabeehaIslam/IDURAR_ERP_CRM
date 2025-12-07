const mongoose = require('mongoose');
const Taxes = require('@/models/appModels/Taxes');

describe('Taxes Model Tests', () => {
  describe('Taxes Creation', () => {
    it('should create a valid tax with required fields', async () => {
      const taxData = {
        taxName: 'VAT',
        taxValue: 18,
      };

      const tax = await Taxes.create(taxData);

      expect(tax).toBeDefined();
      expect(tax.taxName).toBe('VAT');
      expect(tax.taxValue).toBe(18);
    });

    it('should fail to create tax without taxName', async () => {
      const invalidTax = {
        taxValue: 18,
      };

      await expect(Taxes.create(invalidTax)).rejects.toThrow();
    });

    it('should fail to create tax without taxValue', async () => {
      const invalidTax = {
        taxName: 'VAT',
      };

      await expect(Taxes.create(invalidTax)).rejects.toThrow();
    });

    it('should fail to create tax without required fields', async () => {
      const invalidTax = {
        isDefault: true,
      };

      await expect(Taxes.create(invalidTax)).rejects.toThrow();
    });
  });

  describe('Taxes Default Values', () => {
    it('should set default removed to false', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      expect(tax.removed).toBe(false);
    });

    it('should set default enabled to true', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      expect(tax.enabled).toBe(true);
    });

    it('should set default isDefault to false', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      expect(tax.isDefault).toBe(false);
    });

    it('should set created timestamp', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      expect(tax.created).toBeInstanceOf(Date);
    });
  });

  describe('Taxes Optional Fields', () => {
    it('should create tax with isDefault set to true', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
        isDefault: true,
      });

      expect(tax.isDefault).toBe(true);
    });

    it('should create tax with enabled set to false', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
        enabled: false,
      });

      expect(tax.enabled).toBe(false);
    });

    it('should create tax with removed set to true', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
        removed: true,
      });

      expect(tax.removed).toBe(true);
    });
  });

  describe('Taxes Value Types', () => {
    it('should create tax with integer value', async () => {
      const tax = await Taxes.create({
        taxName: 'Sales Tax',
        taxValue: 10,
      });

      expect(tax.taxValue).toBe(10);
    });

    it('should create tax with decimal value', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18.5,
      });

      expect(tax.taxValue).toBe(18.5);
    });

    it('should create tax with zero value', async () => {
      const tax = await Taxes.create({
        taxName: 'Zero Tax',
        taxValue: 0,
      });

      expect(tax.taxValue).toBe(0);
    });

    it('should accept negative tax values', async () => {
      const tax = await Taxes.create({
        taxName: 'Discount Tax',
        taxValue: -5,
      });

      expect(tax.taxValue).toBe(-5);
    });
  });

  describe('Taxes CRUD Operations', () => {
    it('should find tax by id', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      const foundTax = await Taxes.findById(tax._id);
      expect(foundTax).toBeDefined();
      expect(foundTax._id.toString()).toBe(tax._id.toString());
      expect(foundTax.taxName).toBe('VAT');
    });

    it('should update tax name', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      tax.taxName = 'Value Added Tax';
      await tax.save();

      const updatedTax = await Taxes.findById(tax._id);
      expect(updatedTax.taxName).toBe('Value Added Tax');
    });

    it('should update tax value', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      tax.taxValue = 20;
      await tax.save();

      const updatedTax = await Taxes.findById(tax._id);
      expect(updatedTax.taxValue).toBe(20);
    });

    it('should soft delete tax by setting removed flag', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      tax.removed = true;
      await tax.save();

      const deletedTax = await Taxes.findById(tax._id);
      expect(deletedTax.removed).toBe(true);
    });

    it('should disable tax by setting enabled flag', async () => {
      const tax = await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      tax.enabled = false;
      await tax.save();

      const disabledTax = await Taxes.findById(tax._id);
      expect(disabledTax.enabled).toBe(false);
    });

    it('should count active taxes', async () => {
      await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      await Taxes.create({
        taxName: 'Sales Tax',
        taxValue: 10,
      });

      await Taxes.create({
        taxName: 'Disabled Tax',
        taxValue: 5,
        enabled: false,
      });

      const count = await Taxes.countDocuments({ removed: false, enabled: true });
      expect(count).toBe(2);
    });

    it('should find all taxes', async () => {
      await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      await Taxes.create({
        taxName: 'Sales Tax',
        taxValue: 10,
      });

      const taxes = await Taxes.find({ removed: false });
      expect(taxes).toHaveLength(2);
    });

    it('should find default tax', async () => {
      await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
        isDefault: true,
      });

      await Taxes.create({
        taxName: 'Sales Tax',
        taxValue: 10,
      });

      const defaultTax = await Taxes.findOne({ isDefault: true, removed: false });
      expect(defaultTax).toBeDefined();
      expect(defaultTax.taxName).toBe('VAT');
    });
  });

  describe('Taxes Name Validation', () => {
    it('should create taxes with different names', async () => {
      const taxTypes = [
        { name: 'VAT', value: 18 },
        { name: 'Sales Tax', value: 10 },
        { name: 'GST', value: 15 },
        { name: 'Service Tax', value: 5 },
      ];

      for (const taxType of taxTypes) {
        const tax = await Taxes.create({
          taxName: taxType.name,
          taxValue: taxType.value,
        });

        expect(tax.taxName).toBe(taxType.name);
        expect(tax.taxValue).toBe(taxType.value);
      }
    });

    it('should allow duplicate tax names (no unique constraint)', async () => {
      await Taxes.create({
        taxName: 'VAT',
        taxValue: 18,
      });

      const duplicate = await Taxes.create({
        taxName: 'VAT',
        taxValue: 20,
      });

      expect(duplicate).toBeDefined();
      expect(duplicate.taxName).toBe('VAT');
      expect(duplicate.taxValue).toBe(20);
    });
  });
});
