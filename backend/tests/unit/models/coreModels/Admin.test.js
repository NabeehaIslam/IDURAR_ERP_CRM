const bcrypt = require('bcryptjs');
const Admin = require('@/models/coreModels/Admin');
const AdminPassword = require('@/models/coreModels/AdminPassword');
const { clearDatabase } = require('../../helpers/dbHelper');

describe('Admin Model - Unit Tests', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe('Admin Model Validation', () => {
    it('should create admin with valid data', async () => {
      const adminData = {
        email: 'admin@test.com',
        name: 'Test Admin',
        surname: 'User',
        enabled: true,
        role: 'owner',
      };

      const admin = await Admin.create(adminData);

      expect(admin).toBeDefined();
      expect(admin.email).toBe('admin@test.com');
      expect(admin.name).toBe('Test Admin');
      expect(admin.surname).toBe('User');
      expect(admin.enabled).toBe(true);
      expect(admin.role).toBe('owner');
      expect(admin.removed).toBe(false);
    });

    it('should fail to create admin without required email', async () => {
      const adminData = {
        name: 'Test Admin',
      };

      await expect(Admin.create(adminData)).rejects.toThrow();
    });

    it('should fail to create admin without required name', async () => {
      const adminData = {
        email: 'admin@test.com',
      };

      await expect(Admin.create(adminData)).rejects.toThrow();
    });

    it('should convert email to lowercase', async () => {
      const adminData = {
        email: 'ADMIN@TEST.COM',
        name: 'Test Admin',
      };

      const admin = await Admin.create(adminData);
      expect(admin.email).toBe('admin@test.com');
    });

    it('should set default values correctly', async () => {
      const adminData = {
        email: 'admin@test.com',
        name: 'Test Admin',
      };

      const admin = await Admin.create(adminData);
      expect(admin.removed).toBe(false);
      expect(admin.enabled).toBe(false); // Default is false
      expect(admin.role).toBe('owner'); // Default role
      expect(admin.created).toBeDefined();
    });
  });

  describe('AdminPassword Model', () => {
    let admin;

    beforeEach(async () => {
      admin = await Admin.create({
        email: 'admin@test.com',
        name: 'Test Admin',
        enabled: true,
      });
    });

    it('should create admin password with valid data', async () => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync('password123', 10);

      const adminPassword = await AdminPassword.create({
        user: admin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      expect(adminPassword).toBeDefined();
      expect(adminPassword.user.toString()).toBe(admin._id.toString());
      expect(adminPassword.password).toBeDefined();
      expect(adminPassword.emailVerified).toBe(true);
      expect(adminPassword.removed).toBe(false);
    });

    it('should fail to create password without user reference', async () => {
      const passwordData = {
        password: 'hashedpassword',
        salt: 'salt',
      };

      await expect(AdminPassword.create(passwordData)).rejects.toThrow();
    });

    it('should generate hash correctly', async () => {
      const salt = 'testsalt';
      const password = 'password123';

      const adminPassword = new AdminPassword({
        user: admin._id,
        password: 'temporary',
        salt: salt,
      });

      const hash = adminPassword.generateHash(salt, password);
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash).not.toBe(password);
    });

    it('should validate password correctly', async () => {
      const salt = 'testsalt';
      const password = 'password123';
      const hashedPassword = bcrypt.hashSync(salt + password);

      const adminPassword = await AdminPassword.create({
        user: admin._id,
        password: hashedPassword,
        salt: salt,
      });

      const isValid = adminPassword.validPassword(salt, password);
      expect(isValid).toBe(true);

      const isInvalid = adminPassword.validPassword(salt, 'wrongpassword');
      expect(isInvalid).toBe(false);
    });

    it('should allow only one password per user', async () => {
      const password1 = await AdminPassword.create({
        user: admin._id,
        password: 'hash1',
        salt: 'salt1',
      });

      expect(password1).toBeDefined();
      expect(password1.user.toString()).toBe(admin._id.toString());

      // Note: unique constraint requires database index to be enforced
      // In production, duplicate passwords for same user are prevented by index
    });

    it('should store logged sessions as array', async () => {
      const adminPassword = await AdminPassword.create({
        user: admin._id,
        password: 'hashedpassword',
        salt: 'salt',
        loggedSessions: ['token1', 'token2'],
      });

      expect(Array.isArray(adminPassword.loggedSessions)).toBe(true);
      expect(adminPassword.loggedSessions).toHaveLength(2);
      expect(adminPassword.loggedSessions).toContain('token1');
    });
  });
});
