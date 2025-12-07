const mongoose = require('mongoose');

/**
 * Clear all collections in the database
 */
async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

/**
 * Drop the entire test database
 */
async function dropDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
  }
}

/**
 * Close database connection
 */
async function closeDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

/**
 * Generate a valid MongoDB ObjectId
 */
function generateObjectId() {
  return new mongoose.Types.ObjectId();
}

/**
 * Check if a string is a valid MongoDB ObjectId
 */
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  clearDatabase,
  dropDatabase,
  closeDatabase,
  generateObjectId,
  isValidObjectId,
};
