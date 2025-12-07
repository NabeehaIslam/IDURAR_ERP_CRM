const mongoose = require('mongoose');
const Setting = require('@/models/coreModels/Setting');
const listAllSettings = require('@/middlewares/settings/listAllSettings');

describe('listAllSettings Middleware Tests', () => {
  describe('Basic Functionality', () => {
    it('should return all non-removed settings', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      await Setting.create({
        settingCategory: 'security',
        settingKey: 'session_timeout',
        settingValue: 3600,
      });

      const result = await listAllSettings();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
    });

    it('should return empty array when no settings exist', async () => {
      const result = await listAllSettings();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should exclude removed settings', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      await Setting.create({
        settingCategory: 'security',
        settingKey: 'old_setting',
        settingValue: 'value',
        removed: true,
      });

      const result = await listAllSettings();

      expect(result.length).toBe(1);
      expect(result[0].settingKey).toBe('app_name');
    });

    it('should include disabled settings (only filters removed)', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'enabled_setting',
        settingValue: 'value1',
        enabled: true,
      });

      await Setting.create({
        settingCategory: 'application',
        settingKey: 'disabled_setting',
        settingValue: 'value2',
        enabled: false,
      });

      const result = await listAllSettings();

      expect(result.length).toBe(2);
    });
  });

  describe('Return Value Structure', () => {
    it('should return settings with all fields', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
        valueType: 'String',
      });

      const result = await listAllSettings();

      expect(result[0]).toHaveProperty('settingCategory');
      expect(result[0]).toHaveProperty('settingKey');
      expect(result[0]).toHaveProperty('settingValue');
      expect(result[0]).toHaveProperty('valueType');
      expect(result[0]).toHaveProperty('removed');
      expect(result[0]).toHaveProperty('enabled');
    });

    it('should return settings as Mongoose documents', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      const result = await listAllSettings();

      expect(result[0]._id).toBeDefined();
      expect(result[0]._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });
  });

  describe('Multiple Settings', () => {
    it('should return multiple settings from different categories', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      await Setting.create({
        settingCategory: 'security',
        settingKey: 'api_key',
        settingValue: 'secret123',
      });

      await Setting.create({
        settingCategory: 'email',
        settingKey: 'smtp_host',
        settingValue: 'smtp.example.com',
      });

      const result = await listAllSettings();

      expect(result.length).toBe(3);
      
      const categories = result.map(s => s.settingCategory);
      expect(categories).toContain('application');
      expect(categories).toContain('security');
      expect(categories).toContain('email');
    });

    it('should return settings with different value types', async () => {
      await Setting.create({
        settingCategory: 'app',
        settingKey: 'name',
        settingValue: 'IDURAR',
        valueType: 'String',
      });

      await Setting.create({
        settingCategory: 'app',
        settingKey: 'max_users',
        settingValue: 100,
        valueType: 'Number',
      });

      await Setting.create({
        settingCategory: 'app',
        settingKey: 'maintenance',
        settingValue: false,
        valueType: 'Boolean',
      });

      const result = await listAllSettings();

      expect(result.length).toBe(3);
    });

    it('should handle large number of settings', async () => {
      const settingsPromises = [];
      
      for (let i = 1; i <= 50; i++) {
        settingsPromises.push(
          Setting.create({
            settingCategory: 'test',
            settingKey: `setting_${i}`,
            settingValue: `value_${i}`,
          })
        );
      }

      await Promise.all(settingsPromises);

      const result = await listAllSettings();

      expect(result.length).toBe(50);
    });
  });

  describe('Edge Cases', () => {
    it('should handle settings with undefined settingValue', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'empty_setting',
      });

      const result = await listAllSettings();

      expect(result.length).toBe(1);
      expect(result[0].settingKey).toBe('empty_setting');
    });

    it('should handle private settings', async () => {
      await Setting.create({
        settingCategory: 'security',
        settingKey: 'api_secret',
        settingValue: 'secret',
        isPrivate: true,
      });

      const result = await listAllSettings();

      expect(result.length).toBe(1);
      expect(result[0].isPrivate).toBe(true);
    });

    it('should handle core settings', async () => {
      await Setting.create({
        settingCategory: 'system',
        settingKey: 'db_version',
        settingValue: '1.0.0',
        isCoreSetting: true,
      });

      const result = await listAllSettings();

      expect(result.length).toBe(1);
      expect(result[0].isCoreSetting).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return empty array on database error', async () => {
      // Mock find to throw error
      jest.spyOn(Setting, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      const result = await listAllSettings();

      expect(result).toEqual([]);
      
      Setting.find.mockRestore();
    });

    it('should handle query execution failure gracefully', async () => {
      // Mock exec to throw error
      jest.spyOn(Setting, 'find').mockReturnValueOnce({
        exec: jest.fn().mockRejectedValue(new Error('Execution error')),
      });

      const result = await listAllSettings();

      expect(result).toEqual([]);
      
      Setting.find.mockRestore();
    });
  });

  describe('Filter Behavior', () => {
    it('should only check removed flag, not enabled', async () => {
      await Setting.create({
        settingCategory: 'test',
        settingKey: 'setting1',
        settingValue: 'value1',
        removed: false,
        enabled: true,
      });

      await Setting.create({
        settingCategory: 'test',
        settingKey: 'setting2',
        settingValue: 'value2',
        removed: false,
        enabled: false,
      });

      await Setting.create({
        settingCategory: 'test',
        settingKey: 'setting3',
        settingValue: 'value3',
        removed: true,
        enabled: true,
      });

      const result = await listAllSettings();

      expect(result.length).toBe(2);
      expect(result.find(s => s.settingKey === 'setting1')).toBeDefined();
      expect(result.find(s => s.settingKey === 'setting2')).toBeDefined();
      expect(result.find(s => s.settingKey === 'setting3')).toBeUndefined();
    });
  });

  describe('Data Consistency', () => {
    it('should maintain case for settingCategory', async () => {
      await Setting.create({
        settingCategory: 'APPLICATION', // Will be lowercased by model
        settingKey: 'app_name',
        settingValue: 'IDURAR',
      });

      const result = await listAllSettings();

      expect(result[0].settingCategory).toBe('application');
    });

    it('should maintain case for settingKey', async () => {
      await Setting.create({
        settingCategory: 'application',
        settingKey: 'APP_NAME', // Will be lowercased by model
        settingValue: 'IDURAR',
      });

      const result = await listAllSettings();

      expect(result[0].settingKey).toBe('app_name');
    });
  });
});
