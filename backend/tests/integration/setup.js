const { globSync } = require('glob');
const path = require('path');

// Register all models before running integration tests
// This must be done before requiring the app or any controllers/middlewares
const registerModels = () => {
  // Use absolute path from project root
  const modelsPattern = path.join(__dirname, '../../src/models/**/*.js').replace(/\\/g, '/');
  const modelsFiles = globSync(modelsPattern);
  
  console.log(`📦 Registering ${modelsFiles.length} models from: ${modelsPattern}`);
  
  for (const filePath of modelsFiles) {
    console.log(`   Loading: ${path.basename(filePath)}`);
    require(filePath);
  }
  
  console.log('✅ All models registered');
};

// Call this function immediately when this file is loaded
registerModels();

module.exports = { registerModels };
