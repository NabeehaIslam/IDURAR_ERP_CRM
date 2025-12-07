// Quick test to check MongoDB connection
require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('DATABASE:', process.env.DATABASE);
    
    await mongoose.connect(process.env.DATABASE);
    console.log('✅ Connected successfully!');
    console.log('Database name:', mongoose.connection.name);
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
