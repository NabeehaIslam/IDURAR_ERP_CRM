const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('module-alias/register');

// Load test environment variables
require('dotenv').config({ path: path.join(__dirname, '../../.env.test') });

// Increase timeout for all tests
jest.setTimeout(60000); // Increased to 60 seconds

// Connect to test database before each test file
beforeAll(async () => {
  try {
    // Read MongoDB URI from file created by globalSetup
    const uriPath = path.join(__dirname, 'mongoUri.txt');
    let mongoUri = process.env.DATABASE;

    if (fs.existsSync(uriPath)) {
      mongoUri = fs.readFileSync(uriPath, 'utf-8').trim();
    }

    // Disconnect if already connected
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    // Connect to test database with timeout
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log('✅ Connected to test database:', mongoose.connection.name);
  } catch (error) {
    console.error('❌ Error connecting to test database:', error.message);
    throw error;
  }
}, 60000); // 60 second timeout for beforeAll

// Clean up database after each test
afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
});

// Disconnect after all tests in the file
afterAll(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
      console.log('✅ Disconnected from test database');
    }
  } catch (error) {
    console.error('❌ Error disconnecting from test database:', error.message);
  }
}, 60000); // 60 second timeout for afterAll
