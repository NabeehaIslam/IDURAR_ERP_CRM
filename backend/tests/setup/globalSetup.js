const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../../.env.test') });

module.exports = async () => {
  console.log('\n🚀 Starting test environment...\n');

  // Read the actual DATABASE from .env.test
  const testDbUri = process.env.DATABASE;
  
  if (!testDbUri) {
    throw new Error('DATABASE environment variable not found in .env.test');
  }

  // Save URI to a file for access in setupTests.js
  const uriPath = path.join(__dirname, 'mongoUri.txt');
  fs.writeFileSync(uriPath, testDbUri);

  console.log(`✅ Test environment ready. Using database connection from .env.test\n`);
};
