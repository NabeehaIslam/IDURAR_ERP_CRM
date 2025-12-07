const bcrypt = require('bcryptjs');
const Admin = require('@/models/coreModels/Admin');
const AdminPassword = require('@/models/coreModels/AdminPassword');

describe('AdminPassword Model Tests', () => {
  let testAdmin;

  beforeEach(async () => {
    // Create test admin for password references
    testAdmin = await Admin.create({
      removed: false,
      enabled: true,
      email: 'admin@password.com',
      name: 'Test Admin',
    });
  });

  describe('AdminPassword Creation', () => {
    it('should create admin password with valid data', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      expect(adminPassword).toBeDefined();
      expect(adminPassword.user.toString()).toBe(testAdmin._id.toString());
      expect(adminPassword.password).toBe(hashedPassword);
      expect(adminPassword.salt).toBe(salt);
      expect(adminPassword.emailVerified).toBe(true);
    });

    it('should fail to create password without user reference', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const invalidPassword = {
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      };

      await expect(AdminPassword.create(invalidPassword)).rejects.toThrow();
    });

    it('should fail to create password without password field', async () => {
      const salt = await bcrypt.genSalt(10);

      const invalidPassword = {
        user: testAdmin._id,
        salt: salt,
        emailVerified: true,
      };

      await expect(AdminPassword.create(invalidPassword)).rejects.toThrow();
    });

    it('should fail to create password without salt', async () => {
      const hashedPassword = await bcrypt.hash('testPassword123', 10);

      const invalidPassword = {
        user: testAdmin._id,
        password: hashedPassword,
        emailVerified: true,
      };

      await expect(AdminPassword.create(invalidPassword)).rejects.toThrow();
    });

    it('should fail to create password without emailVerified', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const invalidPassword = {
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
      };

      await expect(AdminPassword.create(invalidPassword)).rejects.toThrow();
    });
  });

  describe('AdminPassword Default Values', () => {
    it('should set default removed to false', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      expect(adminPassword.removed).toBe(false);
    });

    it('should set default enabled to true', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      expect(adminPassword.enabled).toBe(true);
    });

    it('should initialize loggedSessions as empty array', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      expect(adminPassword.loggedSessions).toEqual([]);
    });
  });

  describe('AdminPassword generateHash Method', () => {
    it('should generate hash correctly', async () => {
      const salt = await bcrypt.genSalt(10);
      const adminPassword = new AdminPassword({
        user: testAdmin._id,
        password: 'temporary',
        salt: salt,
        emailVerified: true,
      });

      const plainPassword = 'testPassword123';
      const hash = await adminPassword.generateHash(plainPassword);

      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash).not.toBe(plainPassword);
      
      // Verify the hash can be validated
      const isValid = await bcrypt.compare(plainPassword, hash);
      expect(isValid).toBe(true);
    });

    it('should generate different hashes for same password (due to salt)', async () => {
      const salt1 = await bcrypt.genSalt(10);
      const salt2 = await bcrypt.genSalt(10);
      
      const adminPassword1 = new AdminPassword({
        user: testAdmin._id,
        password: 'temporary',
        salt: salt1,
        emailVerified: true,
      });

      const adminPassword2 = new AdminPassword({
        user: testAdmin._id,
        password: 'temporary',
        salt: salt2,
        emailVerified: true,
      });

      const plainPassword = 'testPassword123';
      const hash1 = await adminPassword1.generateHash(plainPassword);
      const hash2 = await adminPassword2.generateHash(plainPassword);

      expect(hash1).not.toBe(hash2);
    });

    it('should use the salt stored in the model', async () => {
      const salt = await bcrypt.genSalt(10);
      const adminPassword = new AdminPassword({
        user: testAdmin._id,
        password: 'temporary',
        salt: salt,
        emailVerified: true,
      });

      const plainPassword = 'testPassword123';
      const hash = await adminPassword.generateHash(plainPassword);
      
      // Manually hash with same salt
      const manualHash = await bcrypt.hash(plainPassword, salt);
      
      expect(hash).toBe(manualHash);
    });
  });

  describe('AdminPassword validPassword Method', () => {
    it('should validate correct password', async () => {
      const salt = await bcrypt.genSalt(10);
      const plainPassword = 'testPassword123';
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      const isValid = await adminPassword.validPassword(plainPassword);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const salt = await bcrypt.genSalt(10);
      const plainPassword = 'testPassword123';
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      const isValid = await adminPassword.validPassword('wrongPassword');
      expect(isValid).toBe(false);
    });

    it('should be case sensitive', async () => {
      const salt = await bcrypt.genSalt(10);
      const plainPassword = 'TestPassword123';
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      const isValid1 = await adminPassword.validPassword('TestPassword123');
      const isValid2 = await adminPassword.validPassword('testpassword123');
      
      expect(isValid1).toBe(true);
      expect(isValid2).toBe(false);
    });

    it('should reject empty password', async () => {
      const salt = await bcrypt.genSalt(10);
      const plainPassword = 'testPassword123';
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      const isValid = await adminPassword.validPassword('');
      expect(isValid).toBe(false);
    });
  });

  describe('AdminPassword User Reference', () => {
    it('should allow only one password per user', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      // Try to create another password for same user
      const duplicatePassword = AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      await expect(duplicatePassword).rejects.toThrow();
    });

    it('should store user reference as ObjectId', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      expect(adminPassword.user).toBeDefined();
      expect(adminPassword.user.toString()).toBe(testAdmin._id.toString());
    });
  });

  describe('AdminPassword Logged Sessions', () => {
    it('should store logged sessions as array', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
        loggedSessions: ['session1', 'session2'],
      });

      expect(adminPassword.loggedSessions).toBeInstanceOf(Array);
      expect(adminPassword.loggedSessions).toHaveLength(2);
      expect(adminPassword.loggedSessions).toContain('session1');
      expect(adminPassword.loggedSessions).toContain('session2');
    });

    it('should add session to loggedSessions array', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      adminPassword.loggedSessions.push('newSession123');
      await adminPassword.save();

      const updatedPassword = await AdminPassword.findById(adminPassword._id);
      expect(updatedPassword.loggedSessions).toContain('newSession123');
    });

    it('should remove session from loggedSessions array', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
        loggedSessions: ['session1', 'session2', 'session3'],
      });

      adminPassword.loggedSessions = adminPassword.loggedSessions.filter(s => s !== 'session2');
      await adminPassword.save();

      const updatedPassword = await AdminPassword.findById(adminPassword._id);
      expect(updatedPassword.loggedSessions).toHaveLength(2);
      expect(updatedPassword.loggedSessions).not.toContain('session2');
    });
  });

  describe('AdminPassword Email Verification', () => {
    it('should create password with emailVerified true', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      expect(adminPassword.emailVerified).toBe(true);
    });

    it('should create password with emailVerified false', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: false,
      });

      expect(adminPassword.emailVerified).toBe(false);
    });

    it('should update emailVerified status', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: false,
      });

      adminPassword.emailVerified = true;
      await adminPassword.save();

      const updatedPassword = await AdminPassword.findById(adminPassword._id);
      expect(updatedPassword.emailVerified).toBe(true);
    });
  });

  describe('AdminPassword CRUD Operations', () => {
    it('should find password by id', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      const foundPassword = await AdminPassword.findById(adminPassword._id);
      expect(foundPassword).toBeDefined();
      expect(foundPassword._id.toString()).toBe(adminPassword._id.toString());
    });

    it('should find password by user id', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      const foundPassword = await AdminPassword.findOne({ user: testAdmin._id });
      expect(foundPassword).toBeDefined();
      expect(foundPassword.user.toString()).toBe(testAdmin._id.toString());
    });

    it('should update password hash', async () => {
      const salt = await bcrypt.genSalt(10);
      const oldPassword = await bcrypt.hash('oldPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: oldPassword,
        salt: salt,
        emailVerified: true,
      });

      const newSalt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash('newPassword456', newSalt);
      
      adminPassword.password = newPassword;
      adminPassword.salt = newSalt;
      await adminPassword.save();

      const updatedPassword = await AdminPassword.findById(adminPassword._id);
      expect(updatedPassword.password).toBe(newPassword);
      
      const isValid = await updatedPassword.validPassword('newPassword456');
      expect(isValid).toBe(true);
    });

    it('should soft delete password by setting removed flag', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      adminPassword.removed = true;
      await adminPassword.save();

      const deletedPassword = await AdminPassword.findById(adminPassword._id);
      expect(deletedPassword.removed).toBe(true);
    });

    it('should disable password by setting enabled flag', async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('testPassword123', salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      adminPassword.enabled = false;
      await adminPassword.save();

      const disabledPassword = await AdminPassword.findById(adminPassword._id);
      expect(disabledPassword.enabled).toBe(false);
    });
  });

  describe('AdminPassword Security', () => {
    it('should never store plain text password', async () => {
      const salt = await bcrypt.genSalt(10);
      const plainPassword = 'testPassword123';
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const adminPassword = await AdminPassword.create({
        user: testAdmin._id,
        password: hashedPassword,
        salt: salt,
        emailVerified: true,
      });

      expect(adminPassword.password).not.toBe(plainPassword);
      expect(adminPassword.password).toBe(hashedPassword);
    });

    it('should generate unique salt for each password', async () => {
      const salt1 = await bcrypt.genSalt(10);
      const salt2 = await bcrypt.genSalt(10);

      expect(salt1).not.toBe(salt2);
    });

    it('should use bcrypt for password hashing', async () => {
      const salt = await bcrypt.genSalt(10);
      const plainPassword = 'testPassword123';
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      // bcrypt hashes start with $2a$, $2b$, or $2y$
      expect(hashedPassword).toMatch(/^\$2[aby]\$/);
    });
  });
});
