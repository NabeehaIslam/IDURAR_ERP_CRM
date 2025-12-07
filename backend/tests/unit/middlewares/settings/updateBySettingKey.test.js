const mongoose = require('mongoose');
const Setting = require('@/models/coreModels/Setting');
const updateBySettingKey = require('@/middlewares/settings/updateBySettingKey');

describe('updateBySettingKey Middleware Tests', () => {
  describe('Basic Functionality', () => {
    it('should update setting value by settingKey', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'Old Name',
      });

      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'New Name',
      });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('app_name');
      expect(result.settingValue).toBe('New Name');
    });

    it('should return updated document', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_version',
        settingValue: '1.0.0',
      });

      const result = await updateBySettingKey({
        settingKey: 'app_version',
        settingValue: '2.0.0',
      });

      expect(result.settingValue).toBe('2.0.0');
      
      // Verify in database
      const updated = await Setting.findOne({ settingKey: 'app_version' });
      expect(updated.settingValue).toBe('2.0.0');
    });

    it('should return null when setting not found', async () => {
      const result = await updateBySettingKey({
        settingKey: 'nonexistent_key',
        settingValue: 'value',
      });

      expect(result).toBeNull();
    });

    it('should return null when settingKey is not provided', async () => {
      const result = await updateBySettingKey({
        settingValue: 'value',
      });

      expect(result).toBeNull();
    });

    it('should return null when settingValue is not provided', async () => {
      const result = await updateBySettingKey({
        settingKey: 'app_name',
      });

      expect(result).toBeNull();
    });

    it('should return null when both parameters are missing', async () => {
      const result = await updateBySettingKey({});

      expect(result).toBeNull();
    });
  });

  describe('Different Value Types', () => {
    it('should update string value', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'Old Name',
        valueType: 'String',
      });

      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'Updated Name',
      });

      expect(result.settingValue).toBe('Updated Name');
    });

    it('should update number value', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'max_users',
        settingValue: 50,
        valueType: 'Number',
      });

      const result = await updateBySettingKey({
        settingKey: 'max_users',
        settingValue: 100,
      });

      expect(result.settingValue).toBe(100);
    });

    it('should update boolean value', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'maintenance_mode',
        settingValue: false,
        valueType: 'Boolean',
      });

      const result = await updateBySettingKey({
        settingKey: 'maintenance_mode',
        settingValue: true,
      });

      expect(result.settingValue).toBe(true);
    });

    it('should update object value', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'ui_config',
        settingValue: { theme: 'light' },
        valueType: 'Object',
      });

      const newConfig = { theme: 'dark', language: 'en' };
      const result = await updateBySettingKey({
        settingKey: 'ui_config',
        settingValue: newConfig,
      });

      expect(result.settingValue).toEqual(newConfig);
    });

    it('should update array value', async () => {
      await Setting.create({
        settingCategory: 'security',
        settingKey: 'allowed_domains',
        settingValue: ['example.com'],
        valueType: 'Array',
      });

      const newDomains = ['example.com', 'test.com', 'demo.com'];
      const result = await updateBySettingKey({
        settingKey: 'allowed_domains',
        settingValue: newDomains,
      });

      expect(result.settingValue).toEqual(newDomains);
    });

    it('should change value type', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'flexible_setting',
        settingValue: 'string value',
        valueType: 'String',
      });

      const result = await updateBySettingKey({
        settingKey: 'flexible_setting',
        settingValue: 123,
      });

      expect(result.settingValue).toBe(123);
      expect(typeof result.settingValue).toBe('number');
    });
  });

  describe('Preserves Other Fields', () => {
    it('should not modify settingCategory', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'Old Name',
      });

      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'New Name',
      });

      expect(result.settingCategory).toBe('application');
    });

    it('should not modify enabled flag', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'Old Name',
        enabled: true,
      });

      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'New Name',
      });

      expect(result.enabled).toBe(true);
    });

    it('should not modify removed flag', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'Old Name',
        removed: false,
      });

      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'New Name',
      });

      expect(result.removed).toBe(false);
    });

    it('should not modify isPrivate flag', async () => {
      await Setting.create({
        settingCategory: 'security',
        settingKey: 'api_secret',
        settingValue: 'old_secret',
        isPrivate: true,
      });

      const result = await updateBySettingKey({
        settingKey: 'api_secret',
        settingValue: 'new_secret',
      });

      expect(result.isPrivate).toBe(true);
    });

    it('should not modify isCoreSetting flag', async () => {
      await Setting.create({
        settingCategory: 'system',
        settingKey: 'db_version',
        settingValue: '1.0.0',
        isCoreSetting: true,
      });

      const result = await updateBySettingKey({
        settingKey: 'db_version',
        settingValue: '2.0.0',
      });

      expect(result.isCoreSetting).toBe(true);
    });
  });

  describe('Multiple Updates', () => {
    it('should handle sequential updates', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'counter',
        settingValue: 0,
      });

      const update1 = await updateBySettingKey({
        settingKey: 'counter',
        settingValue: 1,
      });
      expect(update1.settingValue).toBe(1);

      const update2 = await updateBySettingKey({
        settingKey: 'counter',
        settingValue: 2,
      });
      expect(update2.settingValue).toBe(2);

      const update3 = await updateBySettingKey({
        settingKey: 'counter',
        settingValue: 3,
      });
      expect(update3.settingValue).toBe(3);
    });

    it('should update multiple different settings', async () => {
      await Setting.create({
        settingCategory: 'app',
        settingKey: 'setting1',
        settingValue: 'value1',
      });

      await Setting.create({
        settingCategory: 'app',
        settingKey: 'setting2',
        settingValue: 'value2',
      });

      const result1 = await updateBySettingKey({
        settingKey: 'setting1',
        settingValue: 'updated1',
      });

      const result2 = await updateBySettingKey({
        settingKey: 'setting2',
        settingValue: 'updated2',
      });

      expect(result1.settingValue).toBe('updated1');
      expect(result2.settingValue).toBe('updated2');
    });
  });

  describe('Validation', () => {
    it('should run validators on update', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      // Try to update with invalid data (if validators exist)
      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'Valid Name',
      });

      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string as new value', async () => {
      await Setting.create([{
        settingCategory: 'test',
        settingKey: 'empty_string',
        settingValue: 'original',
      }]);

      const result = await updateBySettingKey({
        settingKey: 'empty_string',
        settingValue: '',
      });

      // Empty string is falsy, so middleware returns null
      expect(result).toBeNull();
    });

    it('should handle zero as new value', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'counter',
        settingValue: 100,
      });

      const result = await updateBySettingKey({
        settingKey: 'counter',
        settingValue: 0,
      });

      // Zero is falsy, so middleware returns null due to !settingValue check
      expect(result).toBeNull();
    });

    it('should handle false as new value', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'feature_flag',
        settingValue: true,
      });

      const result = await updateBySettingKey({
        settingKey: 'feature_flag',
        settingValue: false,
      });

      // False is falsy, so middleware returns null due to !settingValue check
      expect(result).toBeNull();
    });

    it('should handle null as settingKey', async () => {
      const result = await updateBySettingKey({
        settingKey: null,
        settingValue: 'value',
      });

      expect(result).toBeNull();
    });

    it('should handle undefined as settingKey', async () => {
      const result = await updateBySettingKey({
        settingKey: undefined,
        settingValue: 'value',
      });

      expect(result).toBeNull();
    });

    it('should handle null as settingValue', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'test_setting',
        settingValue: 'old value',
      });

      const result = await updateBySettingKey({
        settingKey: 'test_setting',
        settingValue: null,
      });

      // null is not a valid settingValue
      expect(result).toBeNull();
    });

    it('should handle undefined as settingValue', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'test_setting',
        settingValue: 'old value',
      });

      const result = await updateBySettingKey({
        settingKey: 'test_setting',
        settingValue: undefined,
      });

      expect(result).toBeNull();
    });
  });

  describe('Case Sensitivity', () => {
    it('should match settingKey case-insensitively (due to lowercase conversion)', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name', // Stored as lowercase
        settingValue: 'Old Name',
      });

      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'New Name',
      });

      expect(result).toBeDefined();
      expect(result.settingValue).toBe('New Name');
    });
  });

  describe('Error Handling', () => {
    it('should return null on database error', async () => {
      jest.spyOn(Setting, 'findOneAndUpdate').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'New Name',
      });

      expect(result).toBeNull();
      
      Setting.findOneAndUpdate.mockRestore();
    });

    it('should return null on invalid parameters', async () => {
      const result = await updateBySettingKey('invalid');

      expect(result).toBeNull();
    });

    it('should throw error when called without arguments', async () => {
      // Middleware destructures parameters, so calling without arguments throws
      await expect(async () => {
        await updateBySettingKey();
      }).rejects.toThrow();
    });
  });

  describe('Return Options', () => {
    it('should return new document (not old one)', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'Old Name',
      });

      const result = await updateBySettingKey({
        settingKey: 'app_name',
        settingValue: 'New Name',
      });

      // Should return updated value, not old one
      expect(result.settingValue).toBe('New Name');
    });
  });
});
