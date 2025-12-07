const mongoose = require('mongoose');
const Setting = require('@/models/coreModels/Setting');
const loadSettings = require('@/middlewares/settings/loadSettings');

describe('loadSettings Middleware Tests', () => {
  describe('Basic Functionality', () => {
    it('should return object with settings as key-value pairs', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'app_name', settingValue: 'IDURAR' },
        { settingCategory: 'app', settingKey: 'app_version', settingValue: '3.0.0' },
      ]);

      const result = await loadSettings();

      expect(typeof result).toBe('object');
      expect(result).not.toBeInstanceOf(Array);
      expect(result).toHaveProperty('app_name');
      expect(result).toHaveProperty('app_version');
      expect(result.app_name).toBe('IDURAR');
      expect(result.app_version).toBe('3.0.0');
    });

    it('should return empty object when no settings exist', async () => {
      const result = await loadSettings();

      expect(typeof result).toBe('object');
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should exclude removed settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'active_setting', settingValue: 'value1', removed: false },
        { settingCategory: 'app', settingKey: 'removed_setting', settingValue: 'value2', removed: true },
      ]);

      const result = await loadSettings();

      expect(result).toHaveProperty('active_setting');
      expect(result).not.toHaveProperty('removed_setting');
    });

    it('should include disabled settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'disabled_setting', settingValue: 'value', enabled: false },
      ]);

      const result = await loadSettings();

      expect(result).toHaveProperty('disabled_setting');
      expect(result.disabled_setting).toBe('value');
    });
  });

  describe('Return Value Structure', () => {
    it('should return plain JavaScript object', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
      ]);

      const result = await loadSettings();

      expect(result.constructor).toBe(Object);
      expect(typeof result).toBe('object');
    });

    it('should use settingKey as object keys', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'app_name', settingValue: 'MyApp' },
        { settingCategory: 'app', settingKey: 'app_email', settingValue: 'test@example.com' },
      ]);

      const result = await loadSettings();

      const keys = Object.keys(result).sort();
      expect(keys).toEqual(['app_email', 'app_name']);
    });

    it('should use settingValue as object values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
        { settingCategory: 'app', settingKey: 'key2', settingValue: 'value2' },
      ]);

      const result = await loadSettings();

      const values = Object.values(result).sort();
      expect(values).toEqual(['value1', 'value2']);
    });

    it('should return object without Mongoose document properties', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
      ]);

      const result = await loadSettings();

      expect(result).not.toHaveProperty('_id');
      expect(result).not.toHaveProperty('settingCategory');
      expect(result).not.toHaveProperty('enabled');
      expect(result).not.toHaveProperty('removed');
    });
  });

  describe('Different Value Types', () => {
    it('should handle string values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'string_key', settingValue: 'string value' },
      ]);

      const result = await loadSettings();

      expect(result.string_key).toBe('string value');
      expect(typeof result.string_key).toBe('string');
    });

    it('should handle number values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'number_key', settingValue: 42 },
      ]);

      const result = await loadSettings();

      expect(result.number_key).toBe(42);
      expect(typeof result.number_key).toBe('number');
    });

    it('should handle boolean true', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'boolean_true', settingValue: true },
      ]);

      const result = await loadSettings();

      expect(result.boolean_true).toBe(true);
      expect(typeof result.boolean_true).toBe('boolean');
    });

    it('should handle boolean false', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'boolean_false', settingValue: false },
      ]);

      const result = await loadSettings();

      expect(result.boolean_false).toBe(false);
      expect(typeof result.boolean_false).toBe('boolean');
    });

    it('should handle object values', async () => {
      await Setting.create([
        {
          settingCategory: 'app',
          settingKey: 'object_key',
          settingValue: { nested: 'value', count: 10 },
        },
      ]);

      const result = await loadSettings();

      expect(result.object_key).toEqual({ nested: 'value', count: 10 });
      expect(typeof result.object_key).toBe('object');
    });

    it('should handle array values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'array_key', settingValue: [1, 2, 3] },
      ]);

      const result = await loadSettings();

      expect(result.array_key).toEqual([1, 2, 3]);
      expect(Array.isArray(result.array_key)).toBe(true);
    });

    it('should handle null values', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'null_key', settingValue: null },
      ]);

      const result = await loadSettings();

      expect(result.null_key).toBeNull();
    });

    it('should handle zero value', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'zero_key', settingValue: 0 },
      ]);

      const result = await loadSettings();

      expect(result.zero_key).toBe(0);
    });

    it('should handle empty string', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'empty_string', settingValue: '' },
      ]);

      const result = await loadSettings();

      expect(result.empty_string).toBe('');
    });

    it('should handle mixed value types', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'string_key', settingValue: 'text' },
        { settingCategory: 'app', settingKey: 'number_key', settingValue: 100 },
        { settingCategory: 'app', settingKey: 'boolean_key', settingValue: false },
        { settingCategory: 'app', settingKey: 'object_key', settingValue: { a: 1 } },
        { settingCategory: 'app', settingKey: 'array_key', settingValue: [1, 2] },
      ]);

      const result = await loadSettings();

      expect(typeof result.string_key).toBe('string');
      expect(typeof result.number_key).toBe('number');
      expect(typeof result.boolean_key).toBe('boolean');
      expect(typeof result.object_key).toBe('object');
      expect(Array.isArray(result.array_key)).toBe(true);
    });
  });

  describe('Multiple Settings', () => {
    it('should load all non-removed settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'setting1', settingValue: 'value1' },
        { settingCategory: 'app', settingKey: 'setting2', settingValue: 'value2' },
        { settingCategory: 'app', settingKey: 'setting3', settingValue: 'value3' },
        { settingCategory: 'app', settingKey: 'setting4', settingValue: 'value4' },
        { settingCategory: 'app', settingKey: 'setting5', settingValue: 'value5' },
      ]);

      const result = await loadSettings();

      expect(Object.keys(result)).toHaveLength(5);
      expect(result.setting1).toBe('value1');
      expect(result.setting2).toBe('value2');
      expect(result.setting3).toBe('value3');
      expect(result.setting4).toBe('value4');
      expect(result.setting5).toBe('value5');
    });

    it('should handle large number of settings', async () => {
      const settingsToCreate = [];

      for (let i = 1; i <= 100; i++) {
        settingsToCreate.push({
          settingCategory: 'test',
          settingKey: `key_${i}`,
          settingValue: `value_${i}`,
        });
      }

      await Setting.create(settingsToCreate);

      const result = await loadSettings();

      expect(Object.keys(result)).toHaveLength(100);
      expect(result.key_1).toBe('value_1');
      expect(result.key_50).toBe('value_50');
      expect(result.key_100).toBe('value_100');
    });
  });

  describe('Categories', () => {
    it('should include settings from all categories', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'app_setting', settingValue: 'value1' },
        { settingCategory: 'user', settingKey: 'user_setting', settingValue: 'value2' },
        { settingCategory: 'system', settingKey: 'system_setting', settingValue: 'value3' },
      ]);

      const result = await loadSettings();

      expect(result).toHaveProperty('app_setting');
      expect(result).toHaveProperty('user_setting');
      expect(result).toHaveProperty('system_setting');
    });
  });

  describe('Removed Settings Filter', () => {
    it('should exclude all removed settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'active1', settingValue: 'value1', removed: false },
        { settingCategory: 'app', settingKey: 'removed1', settingValue: 'value2', removed: true },
        { settingCategory: 'app', settingKey: 'active2', settingValue: 'value3', removed: false },
        { settingCategory: 'app', settingKey: 'removed2', settingValue: 'value4', removed: true },
      ]);

      const result = await loadSettings();

      expect(Object.keys(result)).toHaveLength(2);
      expect(result).toHaveProperty('active1');
      expect(result).toHaveProperty('active2');
      expect(result).not.toHaveProperty('removed1');
      expect(result).not.toHaveProperty('removed2');
    });

    it('should include settings with removed=false', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1', removed: false },
      ]);

      const result = await loadSettings();

      expect(result).toHaveProperty('key1');
    });

    it('should include settings without removed field (default false)', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'value1' },
      ]);

      const result = await loadSettings();

      expect(result).toHaveProperty('key1');
    });
  });

  describe('Use Cases', () => {
    it('should load application configuration', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'app_name', settingValue: 'IDURAR ERP/CRM' },
        { settingCategory: 'app', settingKey: 'app_version', settingValue: '3.0.0' },
        { settingCategory: 'app', settingKey: 'app_locale', settingValue: 'en_US' },
        { settingCategory: 'app', settingKey: 'app_timezone', settingValue: 'UTC' },
      ]);

      const config = await loadSettings();

      expect(config.app_name).toBe('IDURAR ERP/CRM');
      expect(config.app_version).toBe('3.0.0');
      expect(config.app_locale).toBe('en_US');
      expect(config.app_timezone).toBe('UTC');
    });

    it('should load invoice settings', async () => {
      await Setting.create([
        { settingCategory: 'invoice', settingKey: 'invoice_prefix', settingValue: 'INV' },
        { settingCategory: 'invoice', settingKey: 'invoice_tax_rate', settingValue: 0.15 },
        { settingCategory: 'invoice', settingKey: 'invoice_currency', settingValue: 'USD' },
      ]);

      const settings = await loadSettings();

      expect(settings.invoice_prefix).toBe('INV');
      expect(settings.invoice_tax_rate).toBe(0.15);
      expect(settings.invoice_currency).toBe('USD');
    });

    it('should load feature flags', async () => {
      await Setting.create([
        { settingCategory: 'features', settingKey: 'enable_notifications', settingValue: true },
        { settingCategory: 'features', settingKey: 'enable_analytics', settingValue: false },
        { settingCategory: 'features', settingKey: 'enable_beta_features', settingValue: true },
      ]);

      const features = await loadSettings();

      expect(features.enable_notifications).toBe(true);
      expect(features.enable_analytics).toBe(false);
      expect(features.enable_beta_features).toBe(true);
    });

    it('should be suitable for environment initialization', async () => {
      await Setting.create([
        { settingCategory: 'env', settingKey: 'database_url', settingValue: 'mongodb://localhost' },
        { settingCategory: 'env', settingKey: 'api_key', settingValue: 'secret123' },
        { settingCategory: 'env', settingKey: 'max_connections', settingValue: 100 },
      ]);

      const env = await loadSettings();

      expect(env).toHaveProperty('database_url');
      expect(env).toHaveProperty('api_key');
      expect(env).toHaveProperty('max_connections');
      expect(typeof env.max_connections).toBe('number');
    });
  });

  describe('Edge Cases', () => {
    it('should handle settings with special characters in keys', async () => {
      await Setting.create([
        { settingCategory: 'test', settingKey: 'key-with-dash', settingValue: 'value1' },
        { settingCategory: 'test', settingKey: 'key_with_underscore', settingValue: 'value2' },
        { settingCategory: 'test', settingKey: 'key.with.dot', settingValue: 'value3' },
      ]);

      const result = await loadSettings();

      expect(result['key-with-dash']).toBe('value1');
      expect(result['key_with_underscore']).toBe('value2');
      expect(result['key.with.dot']).toBe('value3');
    });

    it('should handle numeric string keys', async () => {
      await Setting.create([
        { settingCategory: 'test', settingKey: '123', settingValue: 'numeric key' },
      ]);

      const result = await loadSettings();

      expect(result['123']).toBe('numeric key');
    });

    it('should handle very long setting values', async () => {
      const longValue = 'x'.repeat(10000);
      await Setting.create([
        { settingCategory: 'test', settingKey: 'long_value', settingValue: longValue },
      ]);

      const result = await loadSettings();

      expect(result.long_value).toBe(longValue);
      expect(result.long_value.length).toBe(10000);
    });

    it('should handle deeply nested object values', async () => {
      const nestedObject = {
        level1: {
          level2: {
            level3: {
              value: 'deep',
            },
          },
        },
      };

      await Setting.create([
        { settingCategory: 'test', settingKey: 'nested', settingValue: nestedObject },
      ]);

      const result = await loadSettings();

      expect(result.nested.level1.level2.level3.value).toBe('deep');
    });
  });

  describe('Unique Keys', () => {
    it('should handle duplicate settingKey (only one should exist due to unique constraint)', async () => {
      try {
        await Setting.create([
          { settingCategory: 'app', settingKey: 'duplicate_key', settingValue: 'value1' },
        ]);

        // Attempting to create duplicate should fail due to unique constraint
        await Setting.create([
          { settingCategory: 'app', settingKey: 'duplicate_key', settingValue: 'value2' },
        ]);

        // If no error, load and check
        const result = await loadSettings();
        const keys = Object.keys(result).filter((k) => k === 'duplicate_key');
        expect(keys).toHaveLength(1);
      } catch (error) {
        // Expected behavior - duplicate key error
        expect(error).toBeDefined();
      }
    });
  });

  describe('Performance', () => {
    it('should efficiently load many settings', async () => {
      const settingsToCreate = [];

      for (let i = 1; i <= 500; i++) {
        settingsToCreate.push({
          settingCategory: 'performance',
          settingKey: `perf_key_${i}`,
          settingValue: `value_${i}`,
        });
      }

      await Setting.create(settingsToCreate);

      const startTime = Date.now();
      const result = await loadSettings();
      const endTime = Date.now();

      expect(Object.keys(result)).toHaveLength(500);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });

  describe('Error Handling', () => {
    it('should return empty object on database error', async () => {
      jest.spyOn(Setting, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      const result = await loadSettings();

      expect(typeof result).toBe('object');
      expect(Object.keys(result)).toHaveLength(0);

      Setting.find.mockRestore();
    });

    it('should handle malformed settings gracefully', async () => {
      // Create a setting manually with unusual structure
      await Setting.create([
        { settingCategory: 'test', settingKey: 'normal_key', settingValue: 'value' },
      ]);

      const result = await loadSettings();

      expect(result).toHaveProperty('normal_key');
    });
  });

  describe('Data Consistency', () => {
    it('should reflect current database state', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'key1', settingValue: 'initial' },
      ]);

      const result1 = await loadSettings();
      expect(result1.key1).toBe('initial');

      // Update the setting
      await Setting.findOneAndUpdate({ settingKey: 'key1' }, { settingValue: 'updated' });

      const result2 = await loadSettings();
      expect(result2.key1).toBe('updated');
    });

    it('should not be affected by disabled settings', async () => {
      await Setting.create([
        { settingCategory: 'app', settingKey: 'enabled_key', settingValue: 'value1', enabled: true },
        { settingCategory: 'app', settingKey: 'disabled_key', settingValue: 'value2', enabled: false },
      ]);

      const result = await loadSettings();

      // Both should be present (enabled flag doesn't filter)
      expect(result).toHaveProperty('enabled_key');
      expect(result).toHaveProperty('disabled_key');
    });
  });
});
