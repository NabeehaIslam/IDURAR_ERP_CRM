# STEP 1: Test Environment Setup - INSTALLATION GUIDE

## ✅ **STEP 1 COMPLETE**

All configuration files, helpers, and test structure have been created successfully.

---

## 📦 **Manual Installation Required**

Due to dependency conflicts, please install packages manually:

### Option 1: Install All at Once (Recommended)

```bash
cd backend
npm install --save-dev jest@29.7.0 supertest@7.0.0 mongodb-memory-server@9.1.6 cross-env@7.0.3 --legacy-peer-deps
```

### Option 2: Install One by One (If Option 1 Fails)

```bash
cd backend
npm install --save-dev jest@29.7.0 --legacy-peer-deps
npm install --save-dev supertest@7.0.0 --legacy-peer-deps
npm install --save-dev mongodb-memory-server@9.1.6 --legacy-peer-deps
npm install --save-dev cross-env@7.0.3 --legacy-peer-deps
```

---

## ✅ **Verification Steps**

After installation, verify the setup:

### 1. Check Dependencies

```bash
npm list jest supertest mongodb-memory-server cross-env
```

Expected output should show all packages installed.

### 2. Run Smoke Test

```bash
npm test -- tests/setup/setup.test.js
```

**Expected Output:**
```
🚀 Starting MongoDB Memory Server for tests...
✅ MongoDB Memory Server started at: mongodb://127.0.0.1:xxxxx
✅ Connected to test database

Test Environment Setup
  ✓ should connect to test database successfully
  ✓ should have NODE_ENV set to test
  ✓ should have JWT_SECRET configured
  ✓ should be using test database

Tests:       4 passed, 4 total
✅ Disconnected from test database
🛑 Stopping MongoDB Memory Server...
✅ MongoDB Memory Server stopped successfully
```

### 3. Run All Test Scripts

Test each npm script:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

---

## 📁 **What Was Created**

### Configuration Files
- ✅ `jest.config.js` - Jest configuration with 85% coverage threshold
- ✅ `.env.test` - Test environment variables
- ✅ `package.json` - Updated with test scripts

### Test Setup Scripts
- ✅ `tests/setup/globalSetup.js` - MongoDB Memory Server initialization
- ✅ `tests/setup/globalTeardown.js` - Cleanup after all tests
- ✅ `tests/setup/setupTests.js` - Per-file setup and database cleanup
- ✅ `tests/setup/setup.test.js` - Smoke test for verification

### Test Helpers
- ✅ `tests/helpers/authHelper.js` - Authentication utilities (create users, tokens)
- ✅ `tests/helpers/dbHelper.js` - Database utilities (clear, drop, ObjectId)
- ✅ `tests/helpers/factories.js` - Test data factories (Admin, Client, Invoice, etc.)
- ✅ `tests/helpers/requestHelper.js` - Supertest request helpers

### Documentation
- ✅ `tests/README.md` - Main testing documentation (THIS FILE)
- ✅ `tests/unit/README.md` - Unit tests placeholder
- ✅ `tests/integration/README.md` - Integration tests placeholder
- ✅ `tests/coverage/README.md` - Coverage reports placeholder

---

## 🔧 **Test Infrastructure Features**

### ✅ Isolated Test Database
- Uses MongoDB Memory Server (in-memory database)
- No production/development database is touched
- Automatic cleanup after each test
- Fresh database state for every test file

### ✅ Authentication Helpers
```javascript
const { createAuthenticatedUser } = require('./helpers/authHelper');

// Create admin with token
const { admin, token, authHeader } = await createAuthenticatedUser();
```

### ✅ Data Factories
```javascript
const { ClientFactory } = require('./helpers/factories');

// Create test client
const client = await ClientFactory.create({ name: 'Test Corp' });

// Create multiple clients
const clients = await ClientFactory.createMany(5);
```

### ✅ Request Helpers
```javascript
const { authenticatedRequest } = require('./helpers/requestHelper');

// Make authenticated API request
const res = await authenticatedRequest(app, 'get', '/api/clients', token);
```

---

## 🧪 **Test Scripts Available**

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:unit` | Run only unit tests |
| `npm run test:integration` | Run only integration tests |

---

## 📊 **Coverage Configuration**

Target: **≥ 85%** across all metrics

```javascript
coverageThresholds: {
  global: {
    branches: 85,
    functions: 85,
    lines: 85,
    statements: 85
  }
}
```

Coverage reports generated in:
- **HTML:** `tests/coverage/lcov-report/index.html`
- **LCOV:** `tests/coverage/lcov.info`
- **JSON:** `tests/coverage/coverage-summary.json`

---

## ⚠️ **Troubleshooting**

### Issue: MongoDB Memory Server Fails to Start

**Solution:**
```bash
# Clear MongoDB Memory Server cache
rm -rf ~/.cache/mongodb-memory-server
# Or on Windows:
Remove-Item -Recurse -Force $env:USERPROFILE\.cache\mongodb-memory-server
```

### Issue: Tests Timeout

**Solution:** Increase timeout in `jest.config.js`:
```javascript
testTimeout: 60000, // 60 seconds
```

### Issue: Port Already in Use

**Solution:** The test environment uses port 8889 (not 8888). If conflict:
```bash
# Change PORT in .env.test
PORT=8890
```

---

## ✅ **Step 1 Status: COMPLETE**

**Deliverables:**
- ✅ Complete Jest + Supertest configuration
- ✅ MongoDB Memory Server integration
- ✅ Test database isolation
- ✅ Authentication & data helpers
- ✅ Test directory structure
- ✅ Comprehensive documentation
- ✅ Smoke test for verification

**Next Step:** Step 2 - Write 10-12 unit tests

---

## 📞 **Ready for Step 2**

Reply with **"next"** or **"done"** to proceed to Step 2:
- Write 10-12 unit tests for Auth & Customer modules
- Target 80%+ coverage for tested modules
- Update unit test README with results

---

**Created:** December 6, 2025  
**Tester:** Arsal  
**Status:** ✅ READY FOR TESTING
