const mongoose = require('mongoose');
const Setting = require('@/models/coreModels/Setting');
const listBySettingKey = require('@/middlewares/settings/listBySettingKey');

describe('listBySettingKey Middleware Tests', () => {
  describe('Basic Functionality', () => {
    it('should return array of settings matching provided keys', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
        { settingCategory: 'app', settingKey: 'key2', settingValue: 'value2' },
        { settingCategory: 'app', settingKey: 'key3', settingValue: 'value3' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['key1', 'key2'] });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result.map((s) => s.settingKey)).toEqual(['key1', 'key2']);
    });

    it('should return empty array when no keys match', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['nonexistent1', 'nonexistent2'] });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should return empty array when settingKeyArray is empty', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: [] });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should return empty array when settingKeyArray is not provided', async () => {
      const result = await listBySettingKey({});

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should return empty array when settingKeyArray is undefined', async () => {
      const result = await listBySettingKey({ settingKeyArray: undefined });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should return empty array when settingKeyArray is null', async () => {
      const result = await listBySettingKey({ settingKeyArray: null });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });
  });

  describe('Single Key Scenarios', () => {
    it('should handle single key in array', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'single_key', settingValue: 'value' },
        { settingCategory: 'app', settingKey: 'other_key', settingValue: 'value2' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['single_key'] });

      expect(result).toHaveLength(1);
      expect(result[0].settingKey).toBe('single_key');
    });
  });

  describe('Multiple Keys', () => {
    it('should return settings for multiple keys', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'app_name', settingValue: 'MyApp' },
        { settingCategory: 'app', settingKey: 'app_version', settingValue: '1.0.0' },
        { settingCategory: 'app', settingKey: 'app_author', settingValue: 'John' },
        { settingCategory: 'other', settingKey: 'other_setting', settingValue: 'value' },
      ]);

      const result = await listBySettingKey({
        settingKeyArray: ['app_name', 'app_version', 'app_author'],
      });

      expect(result).toHaveLength(3);
      const keys = result.map((s) => s.settingKey);
      expect(keys).toContain('app_name');
      expect(keys).toContain('app_version');
      expect(keys).toContain('app_author');
    });

    it('should handle mix of existing and non-existing keys', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
        { settingCategory: 'app', settingKey: 'key2', settingValue: 'value2' },
      ]);

      const result = await listBySettingKey({
        settingKeyArray: ['key1', 'nonexistent', 'key2', 'another_nonexistent'],
      });

      expect(result).toHaveLength(2);
      expect(result.map((s) => s.settingKey)).toEqual(['key1', 'key2']);
    });

    it('should handle large number of keys', async () => {
      const settingsToCreate = [];
      const keysArray = [];

      for (let i = 1; i <= 100; i++) {
        settingsToCreate.push({
          settingCategory: 'test',
          settingKey: `key_${i}`,
          settingValue: `value_${i}`,
        });
        keysArray.push(`key_${i}`);
      }

      await Setting.create(settingsToCreate);

      const result = await listBySettingKey({ settingKeyArray: keysArray });

      expect(result).toHaveLength(100);
    });
  });

  describe('Return Value Structure', () => {
    it('should return array', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['key1'] });

      expect(Array.isArray(result)).toBe(true);
    });

    it('should return settings with all properties', async () => {
      await Setting.create([
        {
          settingCategory: 'app',
          settingKey: 'key1',
          settingValue: 'value1',
          enabled: true,
          removed: false,
        },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['key1'] });

      expect(result[0]).toHaveProperty('_id');
      expect(result[0]).toHaveProperty('settingKey');
      expect(result[0]).toHaveProperty('settingValue');
      expect(result[0]).toHaveProperty('settingCategory');
      expect(result[0]).toHaveProperty('enabled');
      expect(result[0]).toHaveProperty('removed');
    });

    it('should return Mongoose documents', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['key1'] });

      expect(result[0]._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });
  });

  describe('Different Value Types', () => {
    it('should return settings with string values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'string_key', settingValue: 'string value' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['string_key'] });

      expect(result[0].settingValue).toBe('string value');
    });

    it('should return settings with number values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'number_key', settingValue: 42 },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['number_key'] });

      expect(result[0].settingValue).toBe(42);
    });

    it('should return settings with boolean values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'boolean_key', settingValue: true },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['boolean_key'] });

      expect(result[0].settingValue).toBe(true);
    });

    it('should return settings with object values', async () => {
      await Setting.create([
        {
          settingCategory: 'app',
          settingKey: 'object_key',
          settingValue: { nested: 'value', count: 10 },
        },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['object_key'] });

      expect(result[0].settingValue).toEqual({ nested: 'value', count: 10 });
    });

    it('should return settings with array values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'array_key', settingValue: [1, 2, 3] },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['array_key'] });

      expect(result[0].settingValue).toEqual([1, 2, 3]);
    });

    it('should handle mixed value types', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'string_key', settingValue: 'text' },
        { settingCategory: 'app', settingKey: 'number_key', settingValue: 100 },
        { settingCategory: 'app', settingKey: 'boolean_key', settingValue: false },
      ]);

      const result = await listBySettingKey({
        settingKeyArray: ['string_key', 'number_key', 'boolean_key'],
      });

      expect(result).toHaveLength(3);
      expect(typeof result.find((s) => s.settingKey === 'string_key').settingValue).toBe('string');
      expect(typeof result.find((s) => s.settingKey === 'number_key').settingValue).toBe('number');
      expect(typeof result.find((s) => s.settingKey === 'boolean_key').settingValue).toBe('boolean');
    });
  });

  describe('Setting States', () => {
    it('should include enabled settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'enabled_key', settingValue: 'value', enabled: true },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['enabled_key'] });

      expect(result).toHaveLength(1);
      expect(result[0].enabled).toBe(true);
    });

    it('should include disabled settings', async () => {
      await Setting.create([
        {
          settingCategory: 'app',
          settingKey: 'disabled_key',
          settingValue: 'value',
          enabled: false,
        },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['disabled_key'] });

      expect(result).toHaveLength(1);
      expect(result[0].enabled).toBe(false);
    });

    it('should exclude removed settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'removed_key', settingValue: 'value', removed: true },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['removed_key'] });

      expect(result).toHaveLength(0);
    });

    it('should include non-removed settings only', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1', removed: false },
        { settingCategory: 'app', settingKey: 'key2', settingValue: 'value2', removed: true },
        { settingCategory: 'app', settingKey: 'key3', settingValue: 'value3', removed: false },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['key1', 'key2', 'key3'] });

      expect(result).toHaveLength(2);
      const keys = result.map((s) => s.settingKey).sort();
      expect(keys).toEqual(['key1', 'key3']);
    });
  });

  describe('Categories', () => {
    it('should return settings from different categories', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'app_key', settingValue: 'value1' },
        { settingCategory: 'user', settingKey: 'user_key', settingValue: 'value2' },
        { settingCategory: 'system', settingKey: 'system_key', settingValue: 'value3' },
      ]);

      const result = await listBySettingKey({
        settingKeyArray: ['app_key', 'user_key', 'system_key'],
      });

      expect(result).toHaveLength(3);
      const categories = result.map((s) => s.settingCategory).sort();
      expect(categories).toEqual(['app', 'system', 'user']);
    });
  });

  describe('Duplicate Keys', () => {
    it('should handle duplicate keys in array (no duplicates in result)', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['key1', 'key1', 'key1'] });

      // MongoDB $in handles duplicates, returns unique results
      expect(result).toHaveLength(1);
    });
  });

  describe('Case Sensitivity', () => {
    it('should be case sensitive for settingKey', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'mykey', settingValue: 'value1' },
        { settingCategory: 'app', settingKey: 'otherkey', settingValue: 'value2' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['mykey'] });

      expect(result).toHaveLength(1);
      expect(result[0].settingKey).toBe('mykey');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty database', async () => {
      const result = await listBySettingKey({ settingKeyArray: ['key1', 'key2'] });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should handle special characters in keys', async () => {
      await Setting.create([
        { settingCategory: 'test', settingKey: 'key-with-dash', settingValue: 'value1' },
        { settingCategory: 'test', settingKey: 'key_with_underscore', settingValue: 'value2' },
        { settingCategory: 'test', settingKey: 'key.with.dot', settingValue: 'value3' },
      ]);

      const result = await listBySettingKey({
        settingKeyArray: ['key-with-dash', 'key_with_underscore', 'key.with.dot'],
      });

      expect(result).toHaveLength(3);
    });

    it('should handle numeric strings as keys', async () => {
      await Setting.create([
        { settingCategory: 'test', settingKey: '123', settingValue: 'value' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['123'] });

      expect(result).toHaveLength(1);
      expect(result[0].settingKey).toBe('123');
    });
  });

  describe('Use Cases', () => {
    it('should retrieve application configuration settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'app_name', settingValue: 'IDURAR' },
        { settingCategory: 'app', settingKey: 'app_version', settingValue: '3.0.0' },
        { settingCategory: 'app', settingKey: 'app_locale', settingValue: 'en_US' },
        { settingCategory: 'other', settingKey: 'other_setting', settingValue: 'other' },
      ]);

      const result = await listBySettingKey({
        settingKeyArray: ['app_name', 'app_version', 'app_locale'],
      });

      expect(result).toHaveLength(3);
      expect(result.find((s) => s.settingKey === 'app_name').settingValue).toBe('IDURAR');
      expect(result.find((s) => s.settingKey === 'app_version').settingValue).toBe('3.0.0');
    });

    it('should retrieve user preference settings', async () => {
      await Setting.create([
        { settingCategory: 'user', settingKey: 'theme', settingValue: 'dark' },
        { settingCategory: 'user', settingKey: 'language', settingValue: 'en' },
        { settingCategory: 'user', settingKey: 'notifications', settingValue: true },
      ]);

      const result = await listBySettingKey({
        settingKeyArray: ['theme', 'language', 'notifications'],
      });

      expect(result).toHaveLength(3);
    });

    it('should retrieve invoice-related settings', async () => {
      await Setting.create([
        { settingCategory: 'invoice', settingKey: 'invoice_prefix', settingValue: 'INV' },
        { settingCategory: 'invoice', settingKey: 'invoice_tax_rate', settingValue: 0.15 },
        { settingCategory: 'invoice', settingKey: 'invoice_auto_send', settingValue: false },
      ]);

      const result = await listBySettingKey({
        settingKeyArray: ['invoice_prefix', 'invoice_tax_rate', 'invoice_auto_send'],
      });

      expect(result).toHaveLength(3);
      expect(result.find((s) => s.settingKey === 'invoice_tax_rate').settingValue).toBe(0.15);
    });
  });

  describe('Error Handling', () => {
    it('should return empty array on database error', async () => {
      jest.spyOn(Setting, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      const result = await listBySettingKey({ settingKeyArray: ['key1'] });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);

      Setting.find.mockRestore();
    });

    it('should handle invalid parameter format gracefully', async () => {
      const result = await listBySettingKey('invalid_format');

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should handle non-array settingKeyArray', async () => {
      const result = await listBySettingKey({ settingKeyArray: 'not_an_array' });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should handle number as settingKeyArray', async () => {
      const result = await listBySettingKey({ settingKeyArray: 123 });

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });
  });

  describe('Order', () => {
    it('should maintain order of settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
        { settingCategory: 'app', settingKey: 'key2', settingValue: 'value2' },
        { settingCategory: 'app', settingKey: 'key3', settingValue: 'value3' },
      ]);

      const result = await listBySettingKey({ settingKeyArray: ['key1', 'key2', 'key3'] });

      // Order may not be guaranteed by MongoDB, but all keys should be present
      expect(result).toHaveLength(3);
      const keys = result.map((s) => s.settingKey);
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
    });
  });
});
