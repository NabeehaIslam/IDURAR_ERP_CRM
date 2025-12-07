const mongoose = require('mongoose');
const Setting = require('@/models/coreModels/Setting');
const readBySettingKey = require('@/middlewares/settings/readBySettingKey');

describe('readBySettingKey Middleware Tests', () => {
  describe('Basic Functionality', () => {
    it('should read setting by settingKey', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('app_name');
      expect(result.settingValue).toBe('IDURAR');
    });

    it('should return null when setting not found', async () => {
      const result = await readBySettingKey({ settingKey: 'nonexistent_key' });

      expect(result).toBeNull();
    });

    it('should return null when settingKey is not provided', async () => {
      const result = await readBySettingKey({});

      expect(result).toBeNull();
    });

    it('should return null when settingKey is undefined', async () => {
      const result = await readBySettingKey({ settingKey: undefined });

      expect(result).toBeNull();
    });

    it('should return null when settingKey is null', async () => {
      const result = await readBySettingKey({ settingKey: null });

      expect(result).toBeNull();
    });

    it('should return null when settingKey is empty string', async () => {
      const result = await readBySettingKey({ settingKey: '' });

      expect(result).toBeNull();
    });
  });

  describe('Return Value Structure', () => {
    it('should return setting with all fields', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
        valueType: 'String',
        isPrivate: false,
      });

      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result).toHaveProperty('settingCategory');
      expect(result).toHaveProperty('settingKey');
      expect(result).toHaveProperty('settingValue');
      expect(result).toHaveProperty('valueType');
      expect(result).toHaveProperty('removed');
      expect(result).toHaveProperty('enabled');
      expect(result).toHaveProperty('isPrivate');
    });

    it('should return setting as Mongoose document', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result._id).toBeDefined();
      expect(result._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });
  });

  describe('Different Value Types', () => {
    it('should read string setting', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR ERP/CRM',
        valueType: 'String',
      });

      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result.settingValue).toBe('IDURAR ERP/CRM');
      expect(typeof result.settingValue).toBe('string');
    });

    it('should read number setting', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'max_users',
        settingValue: 100,
        valueType: 'Number',
      });

      const result = await readBySettingKey({ settingKey: 'max_users' });

      expect(result.settingValue).toBe(100);
      expect(typeof result.settingValue).toBe('number');
    });

    it('should read boolean setting', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'maintenance_mode',
        settingValue: true,
        valueType: 'Boolean',
      });

      const result = await readBySettingKey({ settingKey: 'maintenance_mode' });

      expect(result.settingValue).toBe(true);
      expect(typeof result.settingValue).toBe('boolean');
    });

    it('should read object setting', async () => {
      const configObject = { theme: 'dark', language: 'en' };
      
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'ui_config',
        settingValue: configObject,
        valueType: 'Object',
      });

      const result = await readBySettingKey({ settingKey: 'ui_config' });

      expect(result.settingValue).toEqual(configObject);
    });

    it('should read array setting', async () => {
      const allowedDomains = ['example.com', 'test.com'];
      
      await Setting.create({
        settingCategory: 'security',
        settingKey: 'allowed_domains',
        settingValue: allowedDomains,
        valueType: 'Array',
      });

      const result = await readBySettingKey({ settingKey: 'allowed_domains' });

      expect(result.settingValue).toEqual(allowedDomains);
    });
  });

  describe('Setting States', () => {
    it('should read enabled setting', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
        enabled: true,
      });

      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result).toBeDefined();
      expect(result.enabled).toBe(true);
    });

    it('should read disabled setting', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'old_feature',
        settingValue: 'value',
        enabled: false,
      });

      const result = await readBySettingKey({ settingKey: 'old_feature' });

      expect(result).toBeDefined();
      expect(result.enabled).toBe(false);
    });

    it('should read removed setting', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'deleted_setting',
        settingValue: 'value',
        removed: true,
      });

      const result = await readBySettingKey({ settingKey: 'deleted_setting' });

      expect(result).toBeDefined();
      expect(result.removed).toBe(true);
    });

    it('should read private setting', async () => {
      await Setting.create({
        settingCategory: 'security',
        settingKey: 'api_secret',
        settingValue: 'secret123',
        isPrivate: true,
      });

      const result = await readBySettingKey({ settingKey: 'api_secret' });

      expect(result).toBeDefined();
      expect(result.isPrivate).toBe(true);
    });

    it('should read core setting', async () => {
      await Setting.create({
        settingCategory: 'system',
        settingKey: 'db_version',
        settingValue: '1.0.0',
        isCoreSetting: true,
      });

      const result = await readBySettingKey({ settingKey: 'db_version' });

      expect(result).toBeDefined();
      expect(result.isCoreSetting).toBe(true);
    });
  });

  describe('Case Sensitivity', () => {
    it('should handle lowercase settingKey', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name', // Stored as lowercase
        settingValue: 'IDURAR',
      });

      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('app_name');
    });

    it('should convert uppercase settingKey to lowercase (due to model)', async () => {
      // Model converts to lowercase automatically
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'APP_NAME', // Will be stored as 'app_name'
        settingValue: 'IDURAR',
      });

      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('app_name');
    });
  });

  describe('Multiple Settings Scenario', () => {
    beforeEach(async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      await Setting.create({
        settingCategory: 'security',
        settingKey: 'api_key',
        settingValue: 'key123',
      });

      await Setting.create({
        settingCategory: 'email',
        settingKey: 'smtp_host',
        settingValue: 'smtp.example.com',
      });
    });

    it('should find specific setting among multiple', async () => {
      const result = await readBySettingKey({ settingKey: 'api_key' });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('api_key');
      expect(result.settingValue).toBe('key123');
      expect(result.settingCategory).toBe('security');
    });

    it('should return only one setting', async () => {
      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('app_name');
      // Should be single document, not array
      expect(Array.isArray(result)).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle setting with undefined value', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'empty_setting',
      });

      const result = await readBySettingKey({ settingKey: 'empty_setting' });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('empty_setting');
    });

    it('should handle special characters in settingKey', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'setting_with-dash',
        settingValue: 'value',
      });

      const result = await readBySettingKey({ settingKey: 'setting_with-dash' });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('setting_with-dash');
    });

    it('should handle numeric settingKey', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: '12345',
        settingValue: 'numeric key',
      });

      const result = await readBySettingKey({ settingKey: '12345' });

      expect(result).toBeDefined();
      expect(result.settingKey).toBe('12345');
    });
  });

  describe('Error Handling', () => {
    it('should return null on database error', async () => {
      jest.spyOn(Setting, 'findOne').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      const result = await readBySettingKey({ settingKey: 'app_name' });

      expect(result).toBeNull();
      
      Setting.findOne.mockRestore();
    });

    it('should handle invalid parameter format gracefully', async () => {
      const result = await readBySettingKey('invalid_format');

      expect(result).toBeNull();
    });

    it('should throw error when called without arguments', async () => {
      // Middleware destructures parameters, so calling without arguments throws
      await expect(async () => {
        await readBySettingKey();
      }).rejects.toThrow();
    });
  });

  describe('Uniqueness', () => {
    it('should return first setting if duplicate keys exist', async () => {
      // Though unlikely due to database constraints, test behavior
      const first = await Setting.create({
        settingCategory: 'test',
        settingKey: 'duplicate',
        settingValue: 'first',
      });

      const result = await readBySettingKey({ settingKey: 'duplicate' });

      expect(result).toBeDefined();
      expect(result._id.toString()).toBe(first._id.toString());
    });
  });
});
