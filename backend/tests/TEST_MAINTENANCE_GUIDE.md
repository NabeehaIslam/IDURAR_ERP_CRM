# Test Maintenance Guide
## IDURAR ERP/CRM Backend Testing - Operations Manual

**Project:** IDURAR Open Source ERP/CRM  
**Version:** 1.0  
**Last Updated:** December 7, 2025  
**Maintained By:** SQE Testing Team

---

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Running Tests](#running-tests)
3. [Test Development](#test-development)
4. [Troubleshooting](#troubleshooting)
5. [CI/CD Integration](#cicd-integration)
6. [Best Practices](#best-practices)
7. [FAQ](#faq)

---

## 🚀 Quick Start

### Prerequisites

Before running tests, ensure you have:

- ✅ Node.js 18.x or higher
- ✅ npm 8.x or higher
- ✅ MongoDB connection (Atlas or local)
- ✅ Git installed

### Installation

```bash
# Clone repository
git clone https://github.com/NabeehaIslam/IDURAR_ERP_CRM.git
cd IDURAR_ERP_CRM/backend

# Install dependencies
npm install

# Create test environment file
cp .env .env.test

# Edit .env.test with test database credentials
# Replace with your MongoDB test database URL
```

### Environment Setup

Create `.env.test` in `backend/` directory:

```env
# Database
DATABASE=mongodb+srv://username:password@cluster.mongodb.net/idurar_test

# JWT
JWT_SECRET=your_test_secret_key_here_minimum_32_characters

# Environment
NODE_ENV=test

# Server (optional)
PORT=8888
```

**Important:** Use a separate test database, never use production data!

### First Test Run

```bash
# Run all tests
npm test

# Or with Jest directly
npx jest

# Run with coverage
npm run test:coverage
```

**Expected Output:**
```
Test Suites: 26 passed, 26 total
Tests:       690 passed, 47 skipped, 737 total
Time:        ~260s
Coverage:    50.58%
```

---

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run in watch mode (auto-rerun on file changes)
npm run test:watch

# Run specific test suite
npx jest tests/unit/utils/

# Run specific test file
npx jest tests/integration/auth/auth.test.js

# Run tests matching pattern
npx jest --testNamePattern="login"

# Run tests in verbose mode
npx jest --verbose

# Run only failed tests
npx jest --onlyFailures
```

### Recommended Test Runs

#### Fast Feedback (<30 seconds)
Perfect for quick validation during development:
```bash
npx jest tests/unit/utils tests/unit/helpers tests/unit/middlewares/inventory
```
- **Tests:** 345
- **Time:** ~20 seconds
- **Coverage:** Pure functions only

#### Stable Tests Only (<2 minutes)
Run only highly reliable tests:
```bash
npx jest tests/unit/utils tests/unit/helpers tests/unit/middlewares
```
- **Tests:** 296
- **Time:** ~100 seconds
- **Success Rate:** 100%

#### Integration Tests Only (<5 minutes)
Test API endpoints:
```bash
npx jest tests/integration/
```
- **Tests:** 53
- **Time:** ~240 seconds
- **Requires:** Database connection

#### Full Test Suite (<20 minutes)
Complete test run with coverage:
```bash
npm run test:coverage
```
- **Tests:** 737
- **Time:** ~1035 seconds
- **Includes:** Coverage report

### Test Selection Strategies

#### By Test Type

```bash
# Unit tests only
npx jest tests/unit/

# Integration tests only
npx jest tests/integration/

# Model tests only
npx jest tests/unit/models/

# Middleware tests only
npx jest tests/unit/middlewares/
```

#### By Module

```bash
# Authentication tests
npx jest tests/integration/auth/

# Client tests
npx jest tests/integration/clients/

# Utils tests
npx jest tests/unit/utils/

# Settings tests
npx jest tests/unit/settings/
```

#### By Test Name

```bash
# All login tests
npx jest --testNamePattern="login"

# All CRUD tests
npx jest --testNamePattern="create|read|update|delete"

# All validation tests
npx jest --testNamePattern="validation"

# All security tests
npx jest --testNamePattern="security|injection|XSS"
```

### Coverage Reports

#### Generate Coverage

```bash
# Full coverage report
npx jest --coverage

# Coverage for specific path
npx jest tests/unit/ --coverage

# Coverage in different formats
npx jest --coverage --coverageReporters=html,text,lcov,json
```

#### View Coverage Reports

```bash
# Open HTML coverage report (Windows)
start backend/coverage/lcov-report/index.html

# Open HTML coverage report (Mac)
open backend/coverage/lcov-report/index.html

# Open HTML coverage report (Linux)
xdg-open backend/coverage/lcov-report/index.html

# View text summary
cat backend/coverage/coverage-summary.txt
```

#### Coverage Report Locations

```
backend/
├── coverage/
│   ├── lcov-report/
│   │   └── index.html          # Interactive HTML report
│   ├── coverage-final.json     # Machine-readable JSON
│   ├── coverage-summary.txt    # Text summary
│   └── lcov.info              # LCOV format for CI tools
```

---

## 🛠️ Test Development

### Creating New Tests

#### Unit Test Template

```javascript
// tests/unit/[module]/[filename].test.js
const functionToTest = require('../../../src/[path]/[module]');

describe('[Module Name]', () => {
  describe('[Function Name]', () => {
    
    // Test valid inputs
    it('should handle valid input correctly', () => {
      // Arrange
      const input = 'valid data';
      
      // Act
      const result = functionToTest(input);
      
      // Assert
      expect(result).toBe('expected output');
    });
    
    // Test invalid inputs
    it('should throw error for invalid input', () => {
      // Arrange
      const input = null;
      
      // Act & Assert
      expect(() => functionToTest(input)).toThrow();
    });
    
    // Test edge cases
    it('should handle edge case', () => {
      // Test implementation
    });
  });
});
```

#### Integration Test Template

```javascript
// tests/integration/[module]/[module].test.js
const request = require('supertest');
const app = require('../../../src/app');
const mongoose = require('mongoose');
const setupModels = require('../setup');

describe('[API Module] Integration Tests', () => {
  let authToken;
  let testRecord;
  
  // Setup before all tests
  beforeAll(async () => {
    await setupModels();
    await mongoose.connect(process.env.DATABASE);
  });
  
  // Cleanup after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  // Setup before each test
  beforeEach(async () => {
    // Create test admin for authentication
    const admin = await Admin.create({
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'owner'
    });
    
    // Login to get token
    const loginRes = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    authToken = loginRes.body.token;
  });
  
  // Cleanup after each test
  afterEach(async () => {
    await Admin.deleteMany({});
    await YourModel.deleteMany({});
  });
  
  describe('POST /api/[endpoint]/create', () => {
    it('should create new record with valid data', async () => {
      const response = await request(app)
        .post('/api/[endpoint]/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          field1: 'value1',
          field2: 'value2'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toHaveProperty('_id');
    });
    
    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .post('/api/[endpoint]/create')
        .send({ field1: 'value1' });
      
      expect(response.status).toBe(401);
    });
  });
  
  describe('GET /api/[endpoint]/read/:id', () => {
    beforeEach(async () => {
      testRecord = await YourModel.create({
        field1: 'value1',
        field2: 'value2'
      });
    });
    
    it('should read record by ID', async () => {
      const response = await request(app)
        .get(`/api/[endpoint]/read/${testRecord._id}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.result._id).toBe(testRecord._id.toString());
    });
  });
});
```

### Test File Organization

```
tests/
├── unit/                         # Unit tests
│   ├── utils/                   # Utility function tests
│   │   ├── is-path-inside.test.js
│   │   └── currency.test.js
│   ├── helpers/                 # Helper function tests
│   │   ├── calculate.test.js
│   │   └── authHelper.test.js
│   ├── middlewares/             # Middleware tests
│   │   ├── serverData.test.js
│   │   ├── inventory/
│   │   │   └── generateUniqueNumber.test.js
│   │   └── upload/
│   │       └── fileFilterMiddleware.test.js
│   ├── models/                  # Model tests
│   │   ├── coreModels/
│   │   │   ├── Admin.test.js
│   │   │   ├── AdminPassword.test.js
│   │   │   ├── Setting.test.js
│   │   │   └── Upload.test.js
│   │   └── appModels/
│   │       ├── Client.test.js
│   │       ├── Invoice.test.js
│   │       ├── Payment.test.js
│   │       ├── PaymentMode.test.js
│   │       ├── Quote.test.js
│   │       └── Taxes.test.js
│   └── settings/                # Settings tests
│       └── useMoney.test.js
├── integration/                 # Integration tests
│   ├── setup.js                # Model registration
│   ├── auth/                   # Auth API tests
│   │   └── auth.test.js
│   └── clients/                # Client API tests
│       └── clients.test.js
└── setup/                      # Test configuration
    ├── globalSetup.js
    ├── globalTeardown.js
    └── setupTests.js
```

### Naming Conventions

#### File Names
- Unit tests: `[module-name].test.js`
- Integration tests: `[api-module].test.js`
- Setup files: `setup.js`, `fixtures.js`

#### Test Descriptions
```javascript
// Good: Clear, specific, describes behavior
it('should return 401 when token is expired')
it('should create client with valid data')
it('should throw error when email is invalid')

// Bad: Vague, unclear expectations
it('should work')
it('tests the function')
it('checks validation')
```

#### Test Structure
```javascript
describe('[Module/Component Name]', () => {
  describe('[Function/Endpoint Name]', () => {
    
    // Group by scenario
    describe('valid inputs', () => {
      it('should handle case A', () => {});
      it('should handle case B', () => {});
    });
    
    describe('invalid inputs', () => {
      it('should reject case X', () => {});
      it('should reject case Y', () => {});
    });
    
    describe('edge cases', () => {
      it('should handle edge case Z', () => {});
    });
  });
});
```

### Adding Tests to Existing Suites

#### Step 1: Identify Module to Test

```bash
# Check coverage report to find gaps
npx jest --coverage

# Open HTML report
start backend/coverage/lcov-report/index.html

# Find modules with < 80% coverage
```

#### Step 2: Create Test File

```bash
# Create test file in appropriate directory
# For unit tests:
tests/unit/[category]/[module].test.js

# For integration tests:
tests/integration/[api-module]/[endpoint].test.js
```

#### Step 3: Write Tests

Follow templates above, ensure:
- ✅ Clear test descriptions
- ✅ AAA pattern (Arrange, Act, Assert)
- ✅ Test both success and failure cases
- ✅ Test edge cases
- ✅ Proper cleanup in afterEach

#### Step 4: Run Tests

```bash
# Run your new test file
npx jest tests/[path]/[your-test].test.js

# Run with coverage
npx jest tests/[path]/[your-test].test.js --coverage

# Verify coverage improved
npx jest --coverage
```

#### Step 5: Update Documentation

```bash
# Update test count in README
tests/unit/README.md
tests/integration/README.md

# Document any new test categories
# Add setup instructions if needed
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Timeout

**Error:**
```
MongoServerSelectionError: connection timed out
```

**Solution:**
```bash
# Check .env.test has correct DATABASE URL
cat .env.test | grep DATABASE

# Verify MongoDB Atlas IP whitelist
# Go to MongoDB Atlas > Network Access
# Add current IP or use 0.0.0.0/0 for test database

# Test connection manually
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.DATABASE).then(() => console.log('Connected')).catch(err => console.log(err));"
```

#### 2. Tests Timing Out (60 seconds)

**Error:**
```
Timeout - Async callback was not invoked within the 60000ms timeout
```

**Solution:**
```bash
# Increase timeout globally in jest.config.js
# Add: testTimeout: 90000

# Or increase per test file
jest.setTimeout(90000);

# Or increase for specific test
it('slow test', async () => {
  jest.setTimeout(120000);
  // test code
}, 120000);
```

#### 3. Model Not Registered

**Error:**
```
MissingSchemaError: Schema hasn't been registered for model "Client"
```

**Solution:**
```javascript
// Ensure setup.js is imported at top of test file
const setupModels = require('../setup');

// Call setupModels before connecting
beforeAll(async () => {
  await setupModels();
  await mongoose.connect(process.env.DATABASE);
});
```

#### 4. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::8888
```

**Solution:**
```bash
# Kill process on port (Windows)
netstat -ano | findstr :8888
taskkill /PID [PID] /F

# Or use different port in .env.test
PORT=9999
```

#### 5. Intermittent Test Failures

**Symptoms:**
- Tests pass sometimes, fail other times
- "Cannot read property of null" errors
- Timing-related failures

**Solution:**
```javascript
// Add explicit waits
afterEach(async () => {
  await YourModel.deleteMany({});
  await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms
});

// Use async/await properly
it('test', async () => {
  const result = await someAsyncFunction();
  expect(result).toBe('value');
});

// Run tests serially instead of parallel
npx jest --runInBand
```

#### 6. Coverage Not Generated

**Solution:**
```bash
# Clear Jest cache
npx jest --clearCache

# Delete coverage directory
rm -rf coverage/

# Run with fresh coverage
npx jest --coverage
```

#### 7. Tests Not Found

**Error:**
```
No tests found
```

**Solution:**
```bash
# Check jest.config.js testMatch pattern
# Default: "**/*.test.js"

# Verify test file has .test.js extension
# Verify test file is in tests/ directory

# Run with explicit path
npx jest tests/unit/utils/currency.test.js
```

### Debug Techniques

#### Verbose Output

```bash
# See all test execution details
npx jest --verbose

# See only errors
npx jest --silent
```

#### Run Single Test

```bash
# Run one test file
npx jest tests/unit/utils/currency.test.js

# Run one test by name
npx jest --testNamePattern="should validate USD currency code"

# Run one describe block
npx jest --testNamePattern="Currency Validation"
```

#### Debug Mode

```bash
# Run in debug mode (Windows)
node --inspect-brk ./node_modules/.bin/jest --runInBand

# Then open chrome://inspect in Chrome
# Click "inspect" next to your Node process
```

#### Console Logging

```javascript
// Add console logs to debug
it('test', async () => {
  console.log('Starting test');
  const result = await someFunction();
  console.log('Result:', result);
  expect(result).toBe('value');
});
```

#### Skip/Focus Tests

```javascript
// Skip test temporarily
it.skip('not running this test', () => {});

// Only run this test
it.only('only running this test', () => {});

// Skip entire describe block
describe.skip('not running these tests', () => {});

// Only run this describe block
describe.only('only running these tests', () => {});
```

---

## 🤖 CI/CD Integration

### GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Backend Tests

on:
  push:
    branches: [ master, develop ]
  pull_request:
    branches: [ master, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      working-directory: ./backend
      run: npm ci
    
    - name: Run unit tests
      working-directory: ./backend
      run: npx jest tests/unit/ --coverage
      env:
        DATABASE: ${{ secrets.TEST_DATABASE_URL }}
        JWT_SECRET: ${{ secrets.TEST_JWT_SECRET }}
        NODE_ENV: test
    
    - name: Run integration tests
      working-directory: ./backend
      run: npx jest tests/integration/ --coverage
      env:
        DATABASE: ${{ secrets.TEST_DATABASE_URL }}
        JWT_SECRET: ${{ secrets.TEST_JWT_SECRET }}
        NODE_ENV: test
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        files: ./backend/coverage/lcov.info
        flags: backend
        name: backend-coverage
    
    - name: Generate coverage badge
      if: github.ref == 'refs/heads/master'
      run: |
        npx coverage-badge-creator \
          --file ./backend/coverage/coverage-summary.json \
          --output ./backend/coverage/badge.svg
```

### GitLab CI/CD

Create `.gitlab-ci.yml`:

```yaml
image: node:18

stages:
  - test
  - coverage

variables:
  NODE_ENV: test

before_script:
  - cd backend
  - npm ci

test:unit:
  stage: test
  script:
    - npx jest tests/unit/ --coverage
  artifacts:
    paths:
      - backend/coverage/
    expire_in: 30 days
  coverage: '/Lines\s+:\s+(\d+\.\d+)%/'

test:integration:
  stage: test
  script:
    - npx jest tests/integration/ --coverage
  artifacts:
    paths:
      - backend/coverage/
    expire_in: 30 days

coverage:
  stage: coverage
  dependencies:
    - test:unit
    - test:integration
  script:
    - npx jest --coverage
  coverage: '/Lines\s+:\s+(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: backend/coverage/cobertura-coverage.xml
```

### Pre-commit Hooks

Install Husky for Git hooks:

```bash
# Install Husky
npm install --save-dev husky

# Initialize Husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "cd backend && npm test"
```

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

cd backend

# Run fast tests only
npx jest tests/unit/utils tests/unit/helpers tests/unit/middlewares/inventory

# Check if tests passed
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Commit aborted."
  exit 1
fi

echo "✅ Tests passed. Proceeding with commit."
```

### Coverage Badges

#### Codecov Integration

```bash
# Install Codecov
npm install --save-dev codecov

# Add to package.json scripts
"coverage:upload": "codecov -f coverage/lcov.info"

# Upload coverage after tests
npm run test:coverage && npm run coverage:upload
```

#### Shield.io Badge

Add to README.md:

```markdown
![Coverage](https://img.shields.io/badge/coverage-50.58%25-orange)
```

---

## ✅ Best Practices

### Test Writing Guidelines

#### DO ✅

```javascript
// ✅ Use descriptive test names
it('should return 401 when authentication token is missing', () => {});

// ✅ Follow AAA pattern
it('test name', () => {
  // Arrange
  const input = 'data';
  
  // Act
  const result = functionToTest(input);
  
  // Assert
  expect(result).toBe('expected');
});

// ✅ Test one thing per test
it('should validate email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
});

it('should reject invalid email format', () => {
  expect(isValidEmail('invalid')).toBe(false);
});

// ✅ Use beforeEach for setup
beforeEach(async () => {
  testData = await createTestData();
});

// ✅ Clean up after tests
afterEach(async () => {
  await Model.deleteMany({});
});

// ✅ Test both success and failure paths
describe('login', () => {
  it('should succeed with valid credentials', async () => {});
  it('should fail with invalid credentials', async () => {});
  it('should fail when account is disabled', async () => {});
});

// ✅ Use realistic test data
const testClient = {
  name: 'Acme Corporation',
  email: 'contact@acme.com',
  phone: '+1-555-0123'
};
```

#### DON'T ❌

```javascript
// ❌ Vague test names
it('works', () => {});
it('test1', () => {});

// ❌ Testing multiple things
it('should create user and send email and log event', () => {
  // Too much in one test
});

// ❌ Hard-coded IDs
const userId = '507f1f77bcf86cd799439011'; // What if DB changes?

// ❌ No cleanup
it('creates record', async () => {
  await Model.create({ data });
  // ❌ Never cleaned up!
});

// ❌ Dependent tests
it('creates user', () => {
  user = createUser();
});

it('uses user from previous test', () => {
  // ❌ Depends on previous test!
  expect(user).toBeDefined();
});

// ❌ Fake test data
const testClient = {
  name: 'Test Test Test',
  email: 'test@test.test',
  phone: '1234567890'
};
```

### Test Maintenance

#### Regular Tasks

**Weekly:**
- ✅ Run full test suite
- ✅ Review failed tests
- ✅ Fix flaky tests
- ✅ Update test data

**Monthly:**
- ✅ Review coverage report
- ✅ Add tests for new features
- ✅ Refactor duplicate test code
- ✅ Update documentation

**Quarterly:**
- ✅ Audit test quality
- ✅ Remove obsolete tests
- ✅ Update dependencies
- ✅ Performance review

#### Code Review Checklist

When reviewing test code:

- ✅ Test names are descriptive
- ✅ Tests are independent
- ✅ Proper setup and teardown
- ✅ Both success and failure cases tested
- ✅ Edge cases covered
- ✅ No hard-coded values
- ✅ Realistic test data
- ✅ Proper assertions
- ✅ Documentation updated

#### Refactoring Tests

```javascript
// Before: Duplicate setup code
describe('Client API', () => {
  it('test 1', async () => {
    const admin = await Admin.create({...});
    const token = generateToken(admin);
    const client = await Client.create({...});
    // test code
  });
  
  it('test 2', async () => {
    const admin = await Admin.create({...});
    const token = generateToken(admin);
    const client = await Client.create({...});
    // test code
  });
});

// After: DRY with helper functions
describe('Client API', () => {
  let admin, token, client;
  
  beforeEach(async () => {
    admin = await createTestAdmin();
    token = await getAuthToken(admin);
    client = await createTestClient();
  });
  
  afterEach(async () => {
    await cleanupTestData();
  });
  
  it('test 1', async () => {
    // test code using shared setup
  });
  
  it('test 2', async () => {
    // test code using shared setup
  });
});
```

### Performance Optimization

#### Slow Tests

```javascript
// ❌ Slow: Multiple DB calls per test
it('test', async () => {
  await Model1.create({});
  await Model2.create({});
  await Model3.create({});
  // test code
});

// ✅ Fast: Batch operations
it('test', async () => {
  await Promise.all([
    Model1.create({}),
    Model2.create({}),
    Model3.create({})
  ]);
  // test code
});
```

#### Test Parallelization

```bash
# Run tests in parallel (default)
npx jest

# Run tests serially (slower but more stable)
npx jest --runInBand

# Run with specific worker count
npx jest --maxWorkers=4
```

---

## ❓ FAQ

### General Questions

**Q: How long should tests take to run?**  
A: 
- Fast feedback: < 30 seconds (utils, helpers)
- Unit tests: < 2 minutes (all pure functions)
- Integration tests: < 5 minutes (API tests)
- Full suite: < 20 minutes (all tests + coverage)

**Q: What's a good coverage percentage?**  
A:
- Critical code (auth, payment): 90%+
- Business logic: 80%+
- Utils and helpers: 100%
- Overall project: 70-85%

**Q: Should I test third-party libraries?**  
A: No. Test your code that uses the libraries, not the libraries themselves.

**Q: How many assertions per test?**  
A: Typically 1-3. More means you're testing too much in one test.

### Technical Questions

**Q: Why are my tests flaky?**  
A: Common causes:
- Database timing issues
- Parallel test execution conflicts
- Insufficient cleanup
- Hard-coded IDs or timestamps
- External dependencies

**Q: Should I mock everything?**  
A: No. Mock strategically:
- ✅ Mock: External APIs, email services, payment gateways
- ❌ Don't mock: Your own code, database in integration tests

**Q: How do I test async code?**  
A: Use async/await:
```javascript
it('test', async () => {
  const result = await asyncFunction();
  expect(result).toBe('value');
});
```

**Q: Can I run tests without a database?**  
A: 
- Unit tests: Yes (pure functions, no DB needed)
- Integration tests: No (requires DB for API testing)

### Debugging Questions

**Q: My test passes locally but fails in CI. Why?**  
A: Common causes:
- Different Node.js versions
- Missing environment variables
- Different database state
- Timezone differences
- File system differences

**Q: How do I debug a failing test?**  
A:
1. Run test in isolation: `npx jest path/to/test.test.js`
2. Add console.logs
3. Use `it.only()` to focus on one test
4. Check test output with `--verbose`
5. Use Node debugger

**Q: Tests are slow. How do I speed them up?**  
A:
- Use local MongoDB instead of cloud
- Run tests in parallel
- Optimize database operations
- Use test data factories
- Cache expensive operations

---

## 📞 Support

### Getting Help

**Documentation:**
- tests/unit/README.md - Unit test documentation
- tests/integration/README.md - Integration test documentation
- TEST_EXECUTION_REPORT.md - Test results and analysis
- COVERAGE_ANALYSIS.md - Coverage details

**Commands:**
```bash
# View all test scripts
npm run

# Get Jest help
npx jest --help

# Check Jest version
npx jest --version
```

**Common Resources:**
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [MongoDB Testing Guide](https://www.mongodb.com/docs/manual/testing/)

### Reporting Issues

**Test Failures:**
1. Check troubleshooting section above
2. Run test in isolation
3. Check environment setup
4. Review recent code changes
5. Create GitHub issue if bug confirmed

**Coverage Issues:**
1. Generate fresh coverage report
2. Check coverage HTML report for details
3. Identify specific uncovered lines
4. Add tests for critical paths
5. Document coverage gaps

### Contributing

**Adding Tests:**
1. Follow test templates above
2. Ensure tests pass: `npx jest`
3. Check coverage: `npx jest --coverage`
4. Update README files
5. Submit pull request

**Code Review:**
- All test changes require review
- Ensure tests are independent
- Verify coverage improves
- Check documentation is updated

---

**Guide Version:** 1.0  
**Last Updated:** December 7, 2025  
**Maintained By:** SQE Testing Team  
**Next Review:** Monthly or on major changes

---

## 🏆 Summary

This guide provides everything needed to:
- ✅ Run tests effectively
- ✅ Create new tests
- ✅ Troubleshoot issues
- ✅ Maintain test quality
- ✅ Integrate with CI/CD

Keep this guide updated as the project evolves!

**Status: Test Maintenance Guide Complete** 📚
