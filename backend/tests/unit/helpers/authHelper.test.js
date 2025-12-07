const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createTestAdmin, generateTestToken, createAuthenticatedUser } = require('../../helpers/authHelper');
const Admin = require('@/models/coreModels/Admin');
const AdminPassword = require('@/models/coreModels/AdminPassword');
const { clearDatabase } = require('../../helpers/dbHelper');

describe('Auth Helper Functions - Unit Tests', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  describe('createTestAdmin', () => {
    it('should create admin with default values', async () => {
      const { admin, adminPassword } = await createTestAdmin();

      expect(admin).toBeDefined();
      expect(admin.email).toBe('test@test.com');
      expect(admin.name).toBe('Test');
      expect(admin.surname).toBe('Admin');
      expect(admin.enabled).toBe(true);
      expect(adminPassword).toBeDefined();
      expect(adminPassword.user.toString()).toBe(admin._id.toString());
    });

    it('should create admin with custom values', async () => {
      const customData = {
        email: 'custom@test.com',
        name: 'Custom',
        surname: 'User',
      };

      const { admin } = await createTestAdmin(customData);

      expect(admin.email).toBe('custom@test.com');
      expect(admin.name).toBe('Custom');
      expect(admin.surname).toBe('User');
    });

    it('should hash password correctly', async () => {
      const { adminPassword } = await createTestAdmin();

      expect(adminPassword.password).toBeDefined();
      expect(adminPassword.password).not.toBe('password123');
      expect(adminPassword.password.length).toBeGreaterThan(20); // Hashed passwords are longer

      // Verify password can be checked
      const isValid = await bcrypt.compare('password123', adminPassword.password);
      expect(isValid).toBe(true);
    });

    it('should mark email as verified', async () => {
      const { adminPassword } = await createTestAdmin();
      expect(adminPassword.emailVerified).toBe(true);
    });
  });

  describe('generateTestToken', () => {
    it('should generate valid JWT token', async () => {
      const admin = await Admin.create({
        email: 'test@test.com',
        name: 'Test',
        enabled: true,
      });

      const token = generateTestToken(admin);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should include admin id and email in token', async () => {
      const admin = await Admin.create({
        email: 'test@test.com',
        name: 'Test',
        enabled: true,
      });

      const token = generateTestToken(admin);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      expect(decoded.id).toBe(admin._id.toString());
      expect(decoded.email).toBe(admin.email);
    });

    it('should create token that expires in 24 hours', async () => {
      const admin = await Admin.create({
        email: 'test@test.com',
        name: 'Test',
        enabled: true,
      });

      const token = generateTestToken(admin);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const expiresIn = decoded.exp - decoded.iat;
      expect(expiresIn).toBe(86400); // 24 hours in seconds
    });
  });

  describe('createAuthenticatedUser', () => {
    it('should create admin with token and auth header', async () => {
      const { admin, token, authHeader } = await createAuthenticatedUser();

      expect(admin).toBeDefined();
      expect(token).toBeDefined();
      expect(authHeader).toBeDefined();
      expect(authHeader).toBe(`Bearer ${token}`);
    });

    it('should create valid authentication context', async () => {
      const { admin, token } = await createAuthenticatedUser();

      // Verify token is valid
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      expect(decoded.id).toBe(admin._id.toString());

      // Verify admin exists in database
      const dbAdmin = await Admin.findById(admin._id);
      expect(dbAdmin).toBeDefined();
      expect(dbAdmin.email).toBe(admin.email);
    });

    it('should create admin password entry', async () => {
      const { admin } = await createAuthenticatedUser();

      const adminPassword = await AdminPassword.findOne({ user: admin._id });
      expect(adminPassword).toBeDefined();
      expect(adminPassword.emailVerified).toBe(true);
    });
  });

  describe('Password Hashing and Verification', () => {
    it('should hash different passwords differently', async () => {
      const password1 = 'password123';
      const password2 = 'password456';

      const hash1 = await bcrypt.hash(password1, 10);
      const hash2 = await bcrypt.hash(password2, 10);

      expect(hash1).not.toBe(hash2);
    });

    it('should produce different hashes for same password', async () => {
      const password = 'password123';

      const hash1 = await bcrypt.hash(password, 10);
      const hash2 = await bcrypt.hash(password, 10);

      // Different due to different salts
      expect(hash1).not.toBe(hash2);

      // But both should verify correctly
      const valid1 = await bcrypt.compare(password, hash1);
      const valid2 = await bcrypt.compare(password, hash2);
      expect(valid1).toBe(true);
      expect(valid2).toBe(true);
    });

    it('should fail verification with wrong password', async () => {
      const password = 'correctpassword';
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare('wrongpassword', hash);
      expect(isValid).toBe(false);
    });
  });
});
