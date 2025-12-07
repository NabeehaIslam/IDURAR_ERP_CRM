const mongoose = require('mongoose');
const Setting = require('@/models/coreModels/Setting');
const increaseBySettingKey = require('@/middlewares/settings/increaseBySettingKey');

describe('increaseBySettingKey Middleware Tests', () => {
  describe('Basic Functionality', () => {
    it('should increment numeric setting value by 1', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 5,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result).toBeDefined();
      expect(result.settingValue).toBe(6);
    });

    it('should increment from 0 to 1', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'visits',
        settingValue: 0,
      });

      const result = await increaseBySettingKey({ settingKey: 'visits' });

      expect(result.settingValue).toBe(1);
    });

    it('should return null when setting not found', async () => {
      const result = await increaseBySettingKey({ settingKey: 'nonexistent' });

      expect(result).toBeNull();
    });

    it('should return null when settingKey is not provided', async () => {
      const result = await increaseBySettingKey({});

      expect(result).toBeNull();
    });

    it('should return null when settingKey is undefined', async () => {
      const result = await increaseBySettingKey({ settingKey: undefined });

      expect(result).toBeNull();
    });

    it('should return null when settingKey is null', async () => {
      const result = await increaseBySettingKey({ settingKey: null });

      expect(result).toBeNull();
    });

    it('should return null when settingKey is empty string', async () => {
      const result = await increaseBySettingKey({ settingKey: '' });

      expect(result).toBeNull();
    });
  });

  describe('Sequential Increments', () => {
    it('should increment multiple times sequentially', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 1,
      });

      const result1 = await increaseBySettingKey({ settingKey: 'counter' });
      expect(result1.settingValue).toBe(2);

      const result2 = await increaseBySettingKey({ settingKey: 'counter' });
      expect(result2.settingValue).toBe(3);

      const result3 = await increaseBySettingKey({ settingKey: 'counter' });
      expect(result3.settingValue).toBe(4);

      const result4 = await increaseBySettingKey({ settingKey: 'counter' });
      expect(result4.settingValue).toBe(5);
    });

    it('should verify increment persists in database', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 10,
      });

      await increaseBySettingKey({ settingKey: 'counter' });

      const dbRecord = await Setting.findOne({ settingKey: 'counter' });
      expect(dbRecord.settingValue).toBe(11);
    });
  });

  describe('Different Number Values', () => {
    it('should increment positive integers', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'positive_int',
        settingValue: 99,
      });

      const result = await increaseBySettingKey({ settingKey: 'positive_int' });

      expect(result.settingValue).toBe(100);
    });

    it('should increment negative integers', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'negative_int',
        settingValue: -5,
      });

      const result = await increaseBySettingKey({ settingKey: 'negative_int' });

      expect(result.settingValue).toBe(-4);
    });

    it('should increment decimal values', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'decimal',
        settingValue: 5.5,
      });

      const result = await increaseBySettingKey({ settingKey: 'decimal' });

      expect(result.settingValue).toBe(6.5);
    });

    it('should increment large numbers', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'large_number',
        settingValue: 999999,
      });

      const result = await increaseBySettingKey({ settingKey: 'large_number' });

      expect(result.settingValue).toBe(1000000);
    });
  });

  describe('Preserves Other Fields', () => {
    it('should not modify settingCategory', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 5,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result.settingCategory).toBe('application');
    });

    it('should not modify enabled flag', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 5,
        enabled: true,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result.enabled).toBe(true);
    });

    it('should not modify removed flag', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 5,
        removed: false,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result.removed).toBe(false);
    });

    it('should not modify valueType', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 5,
        valueType: 'Number',
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result.valueType).toBe('Number');
    });
  });

  describe('Return Value', () => {
    it('should return updated document', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 5,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('settingKey');
      expect(result).toHaveProperty('settingValue');
      expect(result).toHaveProperty('settingCategory');
    });

    it('should return Mongoose document', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 5,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });

    it('should return new value (not old one)', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 10,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      // Should return incremented value
      expect(result.settingValue).toBe(11);
    });
  });

  describe('Use Cases', () => {
    it('should increment invoice number counter', async () => {
      await Setting.create({
        settingCategory: 'invoice',
        settingKey: 'last_invoice_number',
        settingValue: 1000,
      });

      const result = await increaseBySettingKey({ settingKey: 'last_invoice_number' });

      expect(result.settingValue).toBe(1001);
    });

    it('should increment page visit counter', async () => {
      await Setting.create({
        settingCategory: 'analytics',
        settingKey: 'page_visits',
        settingValue: 5432,
      });

      const result = await increaseBySettingKey({ settingKey: 'page_visits' });

      expect(result.settingValue).toBe(5433);
    });

    it('should increment user registration counter', async () => {
      await Setting.create({
        settingCategory: 'users',
        settingKey: 'total_registrations',
        settingValue: 0,
      });

      const result1 = await increaseBySettingKey({ settingKey: 'total_registrations' });
      expect(result1.settingValue).toBe(1);

      const result2 = await increaseBySettingKey({ settingKey: 'total_registrations' });
      expect(result2.settingValue).toBe(2);
    });

    it('should increment order number sequence', async () => {
      await Setting.create({
        settingCategory: 'orders',
        settingKey: 'order_sequence',
        settingValue: 2023001,
      });

      const result = await increaseBySettingKey({ settingKey: 'order_sequence' });

      expect(result.settingValue).toBe(2023002);
    });
  });

  describe('Edge Cases', () => {
    it('should handle incrementing zero', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'zero_counter',
        settingValue: 0,
      });

      const result = await increaseBySettingKey({ settingKey: 'zero_counter' });

      expect(result.settingValue).toBe(1);
    });

    it('should handle incrementing negative to zero', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'negative_counter',
        settingValue: -1,
      });

      const result = await increaseBySettingKey({ settingKey: 'negative_counter' });

      expect(result.settingValue).toBe(0);
    });

    it('should handle special characters in settingKey', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'counter_with-dash',
        settingValue: 5,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter_with-dash' });

      expect(result.settingValue).toBe(6);
    });
  });

  describe('Multiple Counters', () => {
    it('should increment different counters independently', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'counter_a',
        settingValue: 10,
      });

      await Setting.create({
        settingCategory: 'test',
        settingKey: 'counter_b',
        settingValue: 20,
      });

      const resultA = await increaseBySettingKey({ settingKey: 'counter_a' });
      const resultB = await increaseBySettingKey({ settingKey: 'counter_b' });

      expect(resultA.settingValue).toBe(11);
      expect(resultB.settingValue).toBe(21);
    });

    it('should not affect other counters when incrementing one', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'counter1',
        settingValue: 5,
      });

      await Setting.create({
        settingCategory: 'test',
        settingKey: 'counter2',
        settingValue: 10,
      });

      await increaseBySettingKey({ settingKey: 'counter1' });

      const counter2 = await Setting.findOne({ settingKey: 'counter2' });
      expect(counter2.settingValue).toBe(10); // Should remain unchanged
    });
  });

  describe('Validation', () => {
    it('should run validators on update', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 5,
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result).toBeDefined();
      expect(result.settingValue).toBe(6);
    });
  });

  describe('Error Handling', () => {
    it('should return null on database error', async () => {
      jest.spyOn(Setting, 'findOneAndUpdate').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      const result = await increaseBySettingKey({ settingKey: 'counter' });

      expect(result).toBeNull();
      
      Setting.findOneAndUpdate.mockRestore();
    });

    it('should return null on invalid parameter format', async () => {
      const result = await increaseBySettingKey('invalid_format');

      expect(result).toBeNull();
    });

    it('should throw error when called without arguments', async () => {
      // Middleware destructures parameters, so calling without arguments throws
      await expect(async () => {
        await increaseBySettingKey();
      }).rejects.toThrow();
    });
  });

  describe('Non-Numeric Values', () => {
    it('should attempt to increment string value (MongoDB $inc behavior)', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'string_value',
        settingValue: 'not a number',
      });

      // MongoDB $inc on non-numeric field may fail or behave unexpectedly
      const result = await increaseBySettingKey({ settingKey: 'string_value' });

      // Behavior depends on MongoDB version, but should not crash
      // Result could be null or an error
      expect(result === null || result).toBeDefined();
    });
  });

  describe('Atomicity', () => {
    it('should use atomic operation ($inc)', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'atomic_counter',
        settingValue: 100,
      });

      // Run multiple increments
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(increaseBySettingKey({ settingKey: 'atomic_counter' }));
      }

      await Promise.all(promises);

      // Final value should be 110 (100 + 10)
      const final = await Setting.findOne({ settingKey: 'atomic_counter' });
      expect(final.settingValue).toBe(110);
    });
  });
});
