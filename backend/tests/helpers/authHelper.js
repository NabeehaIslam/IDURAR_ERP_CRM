const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('@/models/coreModels/Admin');
const AdminPassword = require('@/models/coreModels/AdminPassword');

/**
 * Create a test admin user with password
 * @param {Object} overrides - Override default admin properties
 * @returns {Object} Created admin and password objects
 */
async function createTestAdmin(overrides = {}) {
  const defaultAdmin = {
    email: 'test@test.com',
    name: 'Test',
    surname: 'Admin',
    enabled: true,
    role: 'owner',
    ...overrides,
  };

  const admin = await Admin.create(defaultAdmin);

  // Create password for admin with salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const adminPassword = await AdminPassword.create({
    user: admin._id,
    password: hashedPassword,
    salt: salt,
    emailVerified: true,
  });

  return { admin, adminPassword };
}

/**
 * Generate JWT token for test admin
 * @param {Object} admin - Admin object
 * @returns {String} JWT token
 */
function generateTestToken(admin) {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
    },
    process.env.JWT_SECRET || 'test_jwt_secret_key_for_testing_only',
    { expiresIn: '24h' }
  );
}

/**
 * Create authenticated test context
 * @returns {Object} Admin, token, and authorization header
 */
async function createAuthenticatedUser() {
  const { admin } = await createTestAdmin();
  const token = generateTestToken(admin);
  
  return {
    admin,
    token,
    authHeader: `Bearer ${token}`,
  };
}

module.exports = {
  createTestAdmin,
  generateTestToken,
  createAuthenticatedUser,
};
