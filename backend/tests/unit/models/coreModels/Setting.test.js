const mongoose = require('mongoose');
const Setting = require('@/models/coreModels/Setting');

describe('Setting Model Tests', () => {
  describe('Setting Creation', () => {
    it('should create a valid setting with required fields', async () => {
      const settingData = {
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR ERP/CRM',
      };

      const setting = await Setting.create(settingData);

      expect(setting).toBeDefined();
      expect(setting.settingCategory).toBe('application');
      expect(setting.settingKey).toBe('app_name');
      expect(setting.settingValue).toBe('IDURAR ERP/CRM');
    });

    it('should fail to create setting without settingCategory', async () => {
      const invalidSetting = {
        settingKey: 'app_name',
        settingValue: 'IDURAR ERP/CRM',
      };

      await expect(Setting.create(invalidSetting)).rejects.toThrow();
    });

    it('should fail to create setting without settingKey', async () => {
      const invalidSetting = {
        settingCategory: 'application',
        settingValue: 'IDURAR ERP/CRM',
      };

      await expect(Setting.create(invalidSetting)).rejects.toThrow();
    });

    it('should create setting without settingValue (optional field)', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'empty_setting',
      });

      expect(setting).toBeDefined();
      expect(setting.settingValue).toBeUndefined();
    });
  });

  describe('Setting Default Values', () => {
    it('should set default removed to false', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      expect(setting.removed).toBe(false);
    });

    it('should set default enabled to true', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      expect(setting.enabled).toBe(true);
    });

    it('should set default isPrivate to false', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      expect(setting.isPrivate).toBe(false);
    });

    it('should set default isCoreSetting to false', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      expect(setting.isCoreSetting).toBe(false);
    });

    it('should set default valueType to String', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      expect(setting.valueType).toBe('String');
    });
  });

  describe('Setting Case Conversion', () => {
    it('should convert settingCategory to lowercase', async () => {
      const setting = await Setting.create({
        settingCategory: 'APPLICATION',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      expect(setting.settingCategory).toBe('application');
    });

    it('should convert settingKey to lowercase', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'APP_NAME',
        settingValue: 'IDURAR',
      });

      expect(setting.settingKey).toBe('app_name');
    });
  });

  describe('Setting Value Types', () => {
    it('should store string settingValue', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR ERP/CRM',
        valueType: 'String',
      });

      expect(setting.settingValue).toBe('IDURAR ERP/CRM');
      expect(setting.valueType).toBe('String');
    });

    it('should store number settingValue', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'max_users',
        settingValue: 100,
        valueType: 'Number',
      });

      expect(setting.settingValue).toBe(100);
      expect(setting.valueType).toBe('Number');
    });

    it('should store boolean settingValue', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'maintenance_mode',
        settingValue: true,
        valueType: 'Boolean',
      });

      expect(setting.settingValue).toBe(true);
      expect(setting.valueType).toBe('Boolean');
    });

    it('should store object settingValue', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'theme_config',
        settingValue: { primaryColor: '#007bff', secondaryColor: '#6c757d' },
        valueType: 'Object',
      });

      expect(setting.settingValue).toEqual({ primaryColor: '#007bff', secondaryColor: '#6c757d' });
      expect(setting.valueType).toBe('Object');
    });

    it('should store array settingValue', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'allowed_domains',
        settingValue: ['example.com', 'test.com', 'demo.com'],
        valueType: 'Array',
      });

      expect(setting.settingValue).toEqual(['example.com', 'test.com', 'demo.com']);
      expect(setting.valueType).toBe('Array');
    });
  });

  describe('Setting Privacy and Core Settings', () => {
    it('should create private setting', async () => {
      const setting = await Setting.create({
        settingCategory: 'security',
        settingKey: 'api_secret',
        settingValue: 'secret_key_123',
        isPrivate: true,
      });

      expect(setting.isPrivate).toBe(true);
    });

    it('should create core setting', async () => {
      const setting = await Setting.create({
        settingCategory: 'system',
        settingKey: 'database_version',
        settingValue: '1.0.0',
        isCoreSetting: true,
      });

      expect(setting.isCoreSetting).toBe(true);
    });

    it('should create private core setting', async () => {
      const setting = await Setting.create({
        settingCategory: 'system',
        settingKey: 'encryption_key',
        settingValue: 'encrypted_value',
        isPrivate: true,
        isCoreSetting: true,
      });

      expect(setting.isPrivate).toBe(true);
      expect(setting.isCoreSetting).toBe(true);
    });
  });

  describe('Setting CRUD Operations', () => {
    it('should find setting by id', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      const foundSetting = await Setting.findById(setting._id);
      expect(foundSetting).toBeDefined();
      expect(foundSetting._id.toString()).toBe(setting._id.toString());
    });

    it('should find setting by category and key', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      const foundSetting = await Setting.findOne({
        settingCategory: 'application',
        settingKey: 'app_name',
        removed: false,
      });

      expect(foundSetting).toBeDefined();
      expect(foundSetting.settingValue).toBe('IDURAR');
    });

    it('should update setting value', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      setting.settingValue = 'IDURAR ERP/CRM Updated';
      await setting.save();

      const updatedSetting = await Setting.findById(setting._id);
      expect(updatedSetting.settingValue).toBe('IDURAR ERP/CRM Updated');
    });

    it('should soft delete setting by setting removed flag', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      setting.removed = true;
      await setting.save();

      const deletedSetting = await Setting.findById(setting._id);
      expect(deletedSetting.removed).toBe(true);
    });

    it('should disable setting by setting enabled flag', async () => {
      const setting = await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      setting.enabled = false;
      await setting.save();

      const disabledSetting = await Setting.findById(setting._id);
      expect(disabledSetting.enabled).toBe(false);
    });

    it('should count settings by category', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_version',
        settingValue: '1.0.0',
      });

      await Setting.create({
        settingCategory: 'security',
        settingKey: 'encryption',
        settingValue: 'enabled',
      });

      const count = await Setting.countDocuments({
        settingCategory: 'application',
        removed: false,
      });

      expect(count).toBe(2);
    });

    it('should find all settings in category', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_version',
        settingValue: '1.0.0',
      });

      const settings = await Setting.find({
        settingCategory: 'application',
        removed: false,
      });

      expect(settings).toHaveLength(2);
    });

    it('should find public settings only', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
        isPrivate: false,
      });

      await Setting.create({
        settingCategory: 'security',
        settingKey: 'api_key',
        settingValue: 'secret',
        isPrivate: true,
      });

      const publicSettings = await Setting.find({
        isPrivate: false,
        removed: false,
      });

      expect(publicSettings).toHaveLength(1);
      expect(publicSettings[0].settingKey).toBe('app_name');
    });

    it('should find core settings only', async () => {
      await Setting.create({
        settingCategory: 'system',
        settingKey: 'db_version',
        settingValue: '1.0.0',
        isCoreSetting: true,
      });

      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
        isCoreSetting: false,
      });

      const coreSettings = await Setting.find({
        isCoreSetting: true,
        removed: false,
      });

      expect(coreSettings).toHaveLength(1);
      expect(coreSettings[0].settingKey).toBe('db_version');
    });
  });
});
