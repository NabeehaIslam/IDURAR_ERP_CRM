const path = require('path');
const fs = require('fs');

module.exports = async () => {
  console.log('\n🛑 Cleaning up test environment...\n');

  // Clean up the URI file
  const uriPath = path.join(__dirname, 'mongoUri.txt');
  if (fs.existsSync(uriPath)) {
    fs.unlinkSync(uriPath);
  }

  console.log('✅ Test environment cleaned up successfully\n');
};
