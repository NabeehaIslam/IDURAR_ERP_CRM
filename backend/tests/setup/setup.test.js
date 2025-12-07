const { clearDatabase } = require('../helpers/dbHelper');

describe('Test Environment Setup', () => {
  beforeAll(async () => {
    await clearDatabase();
  });

  it('should connect to test database successfully', () => {
    const mongoose = require('mongoose');
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  it('should have NODE_ENV set to test', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it('should have JWT_SECRET configured', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.JWT_SECRET).not.toBe('');
  });

  it('should be using test database', () => {
    const mongoose = require('mongoose');
    const dbName = mongoose.connection.name;
    expect(dbName).toContain('test');
  });
});
