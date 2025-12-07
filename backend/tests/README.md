# IDURAR ERP/CRM Backend Testing Suite

## 📋 Overview

This is the **complete white-box testing implementation** for the IDURAR ERP/CRM backend system. The test suite uses **Jest** as the testing framework and **Supertest** for API integration testing, with **MongoDB Memory Server** for isolated test database instances.

**Tested By:** Arsal (Backend Testing Lead)  
**Project:** Software Quality Engineering Course Project  
**Application:** IDURAR ERP/CRM Open Source  
**Framework:** Jest + Supertest + MongoDB Memory Server  
**Target Coverage:** ≥ 85%

---

## 🎯 Project Goals

1. ✅ **Unit Tests** - Test individual functions, methods, and modules (white-box testing)
2. ✅ **Integration Tests** - Test API endpoints with database interactions
3. ✅ **High Coverage** - Achieve minimum 85% code coverage across lines, branches, functions, and statements
4. ✅ **CI/CD Integration** - Automated testing via GitHub Actions
5. ✅ **Defect Tracking** - Document bugs discovered during testing

---

## 📁 Directory Structure

```
backend/
├── tests/
│   ├── README.md                    # This file - main testing documentation
│   ├── setup/                       # Test configuration and setup
│   │   ├── globalSetup.js          # MongoDB Memory Server initialization
│   │   ├── globalTeardown.js       # Clean up after all tests
│   │   ├── setupTests.js           # Per-test-file setup (DB connection, cleanup)
│   │   └── setup.test.js           # Smoke test for test environment
│   │
│   ├── helpers/                     # Test utilities and helper functions
│   │   ├── authHelper.js           # Authentication helpers (create users, tokens)
│   │   ├── dbHelper.js             # Database utilities (clear, drop, ObjectId)
│   │   ├── factories.js            # Data factories for test objects
│   │   └── requestHelper.js        # Supertest request helpers
│   │
│   ├── unit/                        # Unit tests (white-box)
│   │   └── README.md               # Unit test documentation
│   │
│   ├── integration/                 # Integration tests (API + DB)
│   │   └── README.md               # Integration test documentation
│   │
│   └── coverage/                    # Coverage reports (auto-generated)
│       └── README.md               # Coverage documentation
│
├── jest.config.js                   # Jest configuration
├── .env.test                        # Test environment variables
└── package.json                     # Updated with test scripts
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js v20.9.0 or higher
- npm v10.2.4 or higher
- MongoDB (Not required - uses in-memory database)

### Step 1: Install Dependencies

Navigate to the backend directory and install all testing dependencies:

```bash
cd backend
npm install
```

**New Testing Dependencies Added:**
- `jest` (^29.7.0) - Testing framework
- `supertest` (^6.3.4) - HTTP assertion library
- `mongodb-memory-server` (^9.1.6) - In-memory MongoDB for isolated tests
- `@shelf/jest-mongodb` (^4.3.2) - Jest preset for MongoDB
- `cross-env` (^7.0.3) - Cross-platform environment variables

---

## 🧪 Test Environment Configuration

### Environment Variables

The test suite uses `.env.test` for test-specific configuration:

```env
NODE_ENV=test
DATABASE=mongodb://localhost:27017/idurar_test
JWT_SECRET=test_jwt_secret_key_for_testing_only
PORT=8889
```

**Important:** Tests use **MongoDB Memory Server**, so no external MongoDB instance is required. The DATABASE variable is overridden at runtime.

### Jest Configuration

Key settings in `jest.config.js`:

- **Test Environment:** Node.js
- **Coverage Threshold:** 85% (lines, branches, functions, statements)
- **Test Timeout:** 30 seconds per test
- **Coverage Directory:** `tests/coverage/`
- **Module Alias:** `@/` maps to `src/` (same as production)

---

## 📝 Available Test Scripts

Add these scripts to run tests (already configured in `package.json`):

```json
{
  "scripts": {
    "test": "cross-env NODE_ENV=test jest --runInBand --detectOpenHandles --forceExit",
    "test:watch": "cross-env NODE_ENV=test jest --watch --runInBand",
    "test:coverage": "cross-env NODE_ENV=test jest --coverage --runInBand --detectOpenHandles --forceExit",
    "test:unit": "cross-env NODE_ENV=test jest --testPathPattern=tests/unit --runInBand",
    "test:integration": "cross-env NODE_ENV=test jest --testPathPattern=tests/integration --runInBand --detectOpenHandles --forceExit"
  }
}
```

### Running Tests

#### Run All Tests
```bash
npm test
```

#### Run Tests with Coverage Report
```bash
npm run test:coverage
```

#### Run Only Unit Tests
```bash
npm run test:unit
```

#### Run Only Integration Tests
```bash
npm run test:integration
```

#### Run Tests in Watch Mode (for development)
```bash
npm run test:watch
```

---

## 🔧 Test Utilities & Helpers

### 1. **authHelper.js** - Authentication Utilities

Provides helpers for creating authenticated test users:

```javascript
const { createAuthenticatedUser, generateTestToken } = require('./helpers/authHelper');

// Create admin with token
const { admin, token, authHeader } = await createAuthenticatedUser();
```

### 2. **dbHelper.js** - Database Utilities

Database management functions:

```javascript
const { clearDatabase, generateObjectId } = require('./helpers/dbHelper');

// Clear all collections
await clearDatabase();

// Generate valid MongoDB ObjectId
const id = generateObjectId();
```

### 3. **factories.js** - Test Data Factories

Create test data easily:

```javascript
const { ClientFactory, InvoiceFactory } = require('./helpers/factories');

// Create single client
const client = await ClientFactory.create({ name: 'ACME Corp' });

// Create multiple clients
const clients = await ClientFactory.createMany(5);
```

### 4. **requestHelper.js** - HTTP Request Helpers

Supertest utilities for API testing:

```javascript
const { authenticatedRequest } = require('./helpers/requestHelper');

// Make authenticated GET request
const response = await authenticatedRequest(app, 'get', '/api/clients', token);
```

---

## 🧪 How Tests Work

### Test Lifecycle

1. **Global Setup** (`globalSetup.js`)
   - Starts MongoDB Memory Server before all tests
   - Creates temporary in-memory database
   - Stores connection URI for tests

2. **Per-File Setup** (`setupTests.js`)
   - Runs before each test file
   - Connects to test database
   - Clears collections after each test
   - Disconnects after all tests in file

3. **Test Execution**
   - Unit tests run in isolation
   - Integration tests use Supertest to simulate HTTP requests
   - Database operations use real Mongoose models

4. **Global Teardown** (`globalTeardown.js`)
   - Stops MongoDB Memory Server
   - Cleans up temporary files

### Database Isolation

- Each test file gets a clean database state
- Collections are cleared after each test (`afterEach`)
- No test can affect another test's data
- No production/development database is ever touched

---

## 📊 Coverage Goals

### Target Coverage: ≥ 85%

We aim for **85%+ coverage** across:

- **Lines:** 85%
- **Branches:** 85%
- **Functions:** 85%
- **Statements:** 85%

### Files Included in Coverage

```javascript
collectCoverageFrom: [
  'src/**/*.js',
  '!src/server.js',           // Exclude server entry point
  '!src/setup/**',            // Exclude setup scripts
  '!src/public/**',           // Exclude static files
  '!src/emailTemplate/**',    // Exclude email templates
  '!src/pdf/**',              // Exclude PDF templates
]
```

### Coverage Reports

Coverage reports are generated in multiple formats:

- **Terminal Output:** Text summary
- **HTML Report:** `tests/coverage/lcov-report/index.html`
- **LCOV:** `tests/coverage/lcov.info` (for CI/CD tools)
- **JSON Summary:** `tests/coverage/coverage-summary.json`

---

## ✅ Current Status

### Step 1: Test Environment Setup ✅ COMPLETE

**Completed Tasks:**
- ✅ Jest configuration with proper settings
- ✅ MongoDB Memory Server integration
- ✅ Test environment variables (.env.test)
- ✅ Global setup and teardown scripts
- ✅ Per-test-file setup with database cleanup
- ✅ Test helper utilities (auth, db, factories, requests)
- ✅ Test directory structure created
- ✅ Package.json updated with test scripts
- ✅ Smoke test to verify environment

**Verification:**

Run the smoke test to verify setup:

```bash
npm test -- tests/setup/setup.test.js
```

Expected output:
```
✅ MongoDB Memory Server started
✅ Connected to test database
✅ All setup tests pass
✅ Disconnected from test database
✅ MongoDB Memory Server stopped
```

---

## 📋 Next Steps

### Step 2: Unit Tests (In Progress)
- Write 10-12 unit tests for Auth & Customer modules
- Target: 80%+ coverage for tested modules
- Documentation: `tests/unit/README.md`

### Step 3: Integration Tests
- Write 12-15 API integration tests
- Cover full request/response cycles
- Documentation: `tests/integration/README.md`

### Step 4: Achieve 85%+ Coverage
- Expand test coverage to meet threshold
- Generate coverage report with screenshots
- Documentation: `tests/coverage/README.md`

### Step 5: CI/CD Integration
- Create GitHub Actions workflow
- Automate test execution on push/PR
- Documentation: `.github/workflows/README.md`

### Step 6: Defect Documentation
- Track bugs found during testing
- Create defect table with severity/status
- Final summary report

---

## 🐛 Known Issues & Limitations

### Current Limitations

1. **Email Testing:** Email functionality is mocked (not actually sent)
2. **File Uploads:** File upload tests use mock multipart data
3. **External APIs:** OpenAI and AWS S3 calls are mocked
4. **PDF Generation:** PDF creation is mocked in tests

These are intentional for isolated testing and will be documented in integration tests.

---

## 📞 Support & Questions

**Tester:** Arsal  
**Role:** Backend Testing Lead  
**Course:** Software Quality Engineering  
**Project:** IDURAR ERP/CRM Testing

For questions about test implementation, refer to individual test file READMEs or comments within test code.

---

## 📚 References

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/ladjs/supertest)
- [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)
- [IDURAR GitHub Repository](https://github.com/idurar/idurar-erp-crm)

---

**Last Updated:** December 6, 2025  
**Version:** 1.0.0  
**Status:** Step 1 Complete ✅
