# Integration Tests - API Endpoint Testing

## 📋 Overview

This directory contains comprehensive integration tests for the IDURAR ERP/CRM backend API endpoints. Integration tests validate complete request-response cycles, including authentication, database interactions, and business logic execution.

**Testing Framework:** Jest 28.1.3 + Supertest 7.1.4  
**Database:** MongoDB Atlas (Test Database: `idurar_test`)  
**Test Approach:** HTTP API testing with real database  
**Date Created:** December 2025  
**Test Scope:** Authentication & Client Management APIs  
**Total Test Suites:** 2  
**Total Tests:** 53  
**Status:** ✅ Complete (Defined Scope)

---

## 📊 Integration Test Summary

### Implemented Test Suites (Defined Scope)

| Category | Test Files | Tests | Status |
|----------|------------|-------|--------|
| **Authentication API** | 1 | 22 | ✅ Complete |
| **Client API** | 1 | 31 | ✅ Complete |
| **TOTAL** | **2** | **53** | **✅ Scope Complete** |

### Coverage Contribution

- **Integration Tests Coverage:** ~50% of backend codebase
- **Controllers Tested:** Auth, Client CRUD operations
- **Routes Tested:** `/api/login`, `/api/logout`, `/api/client/*`
- **HTTP Methods Tested:** GET, POST, PATCH, DELETE
- **Database Operations:** Create, Read, Update, Soft Delete, List, Search, Filter

### Test Scope Definition

This project's integration testing scope focused on:
1. **Core Authentication** - Login/logout flows, token management, security
2. **Client Management** - Complete CRUD operations, search, filtering, pagination

These two modules provide comprehensive coverage of:
- RESTful API patterns
- Database interactions (MongoDB)
- Authentication/authorization flows
- Input validation
- Error handling
- Security testing (SQL injection, XSS prevention)

---

## 📁 Directory Structure

```
tests/integration/
├── README.md (this file)
├── setup.js (Model registration for tests)
├── auth/
│   └── auth.test.js (22 tests)
└── clients/
    └── clients.test.js (31 tests)
```

---

## 🔐 Authentication API Tests (22 tests)

**File:** `auth/auth.test.js`  
**Endpoint Base:** `/api/*`  
**Test Coverage:** Login, Logout, Password Reset flows

### Test Categories

#### POST /api/login (5 tests)
- ✅ Login with valid credentials
- ✅ Reject invalid email
- ✅ Reject missing email
- ✅ Reject missing password
- ✅ Reject disabled admin account

#### POST /api/logout (4 tests)
- ✅ Logout with valid token
- ✅ Reject logout without token
- ✅ Reject invalid token
- ✅ Reject malformed authorization header

#### POST /api/forgetpassword (3 tests)
- ✅ Handle non-existent email
- ✅ Reject missing email
- ✅ Reject invalid email format

#### POST /api/resetpassword (2 tests)
- ✅ Reject reset with missing token
- ✅ Reject reset with missing password

#### Authentication Flow (2 tests)
- ✅ Complete authentication cycle
- ✅ Handle multiple concurrent logins

#### Security Tests (3 tests)
- ✅ Password not exposed in response
- ✅ Reject SQL injection attempts
- ✅ Reject XSS attempts in email field

#### Token Management (3 tests)
- ✅ Generate unique tokens per login
- ✅ Include user data in response
- ✅ Set appropriate token expiration

### Key Features Tested

- JWT token generation and validation
- Password hashing with bcrypt + salt
- Email validation
- Account status checks (enabled/disabled)
- Email verification status
- Security: SQL injection, XSS prevention
- Concurrent login handling
- Token uniqueness and expiration
- Authorization header parsing

---

## 👥 Client API Tests (31 tests)

**File:** `clients/clients.test.js`  
**Endpoint Base:** `/api/client/*`  
**Test Coverage:** Full CRUD + Search/Filter/Summary

### Test Categories

#### POST /api/client/create (4 tests)
- ✅ Create client with valid data
- ✅ Reject creation without authentication
- ✅ Reject creation without required name
- ✅ Create client with minimal data

#### GET /api/client/read/:id (4 tests)
- ✅ Read client by ID
- ✅ Return 404 for non-existent client
- ✅ Reject read without authentication
- ✅ Return 500 for invalid ID format

#### PATCH /api/client/update/:id (5 tests)
- ✅ Update client with valid data
- ✅ Partially update client
- ✅ Reject update without authentication
- ✅ Return 404 for non-existent client
- ✅ Update client email

#### DELETE /api/client/delete/:id (4 tests)
- ✅ Soft delete a client
- ✅ Reject delete without authentication
- ✅ Return 404 for non-existent deletion
- ✅ Verify soft delete (not permanent)

#### GET /api/client/list (4 tests)
- ✅ List clients with pagination
- ✅ Not list removed clients
- ✅ Reject list without authentication
- ✅ Support pagination parameters

#### GET /api/client/search (3 tests)
- ✅ Search clients by name
- ✅ Return 202 for no matches
- ✅ Reject search without authentication

#### GET /api/client/filter (2 tests)
- ✅ Filter clients by enabled status
- ✅ Reject filter without authentication

#### GET /api/client/summary (2 tests)
- ✅ Return client statistics summary
- ✅ Reject summary without authentication

#### Data Validation (3 tests)
- ✅ Trim whitespace from client name
- ✅ Handle special characters in name
- ✅ Accept international phone numbers

### Key Features Tested

- Full CRUD operations (Create, Read, Update, Delete)
- Soft delete functionality (removed flag)
- Authentication requirement on all endpoints
- Pagination support (page, items parameters)
- Search functionality (query by name)
- Filter by enabled status
- Summary/statistics generation
- Data validation (required fields, formats)
- Error handling (404, 401, 500 status codes)
- International data support (phone numbers)
- Special character handling

---

## 🛠️ Test Setup & Configuration

### Model Registration

All MongoDB models are automatically registered before tests run via `setup.js`:

```javascript
// Models registered: 11 total
- Setting.js
- Admin.js
- AdminPassword.js
- Upload.js
- Client.js
- Invoice.js
- Payment.js
- PaymentMode.js
- Quote.js
- Taxes.js
```

### Test Fixtures

#### Authentication Setup
```javascript
beforeEach:
- Create test admin (role: owner)
- Hash password with bcrypt + salt
- Login to get JWT token
- Store token for authenticated requests
```

#### Database Cleanup
```javascript
afterEach:
- Clear all collections
- Reset test data
```

---

## 📈 What We Test

### HTTP Layer
- ✅ Request methods (GET, POST, PATCH, DELETE)
- ✅ Status codes (200, 400, 401, 403, 404, 409, 500)
- ✅ Authorization headers
- ✅ Query parameters
- ✅ Request body validation
- ✅ Response structure

### Database Layer
- ✅ Document creation
- ✅ Document retrieval
- ✅ Document updates
- ✅ Soft deletes (removed flag)
- ✅ Filtering (removed=false, enabled=true)
- ✅ Pagination
- ✅ Search queries
- ✅ Aggregations (summary)

### Business Logic
- ✅ Authentication flows
- ✅ Authorization checks
- ✅ Data validation
- ✅ Error handling
- ✅ Token management
- ✅ Password security
- ✅ Email validation
- ✅ Client management workflows

### Security
- ✅ JWT token validation
- ✅ Password hashing (bcrypt)
- ✅ SQL injection prevention
- ✅ XSS prevention
- ✅ Authorization enforcement
- ✅ Email verification checks
- ✅ Account status validation

---

## 🎯 API Endpoints Tested

### Authentication Routes
```
POST /api/login              - User login with credentials
POST /api/logout             - User logout (requires token)
POST /api/forgetpassword     - Request password reset
POST /api/resetpassword      - Reset password with token
```

### Client Routes
```
POST   /api/client/create     - Create new client
GET    /api/client/read/:id   - Get client by ID
PATCH  /api/client/update/:id - Update client
DELETE /api/client/delete/:id - Soft delete client
GET    /api/client/list       - List clients (paginated)
GET    /api/client/search     - Search clients by name
GET    /api/client/filter     - Filter clients by criteria
GET    /api/client/summary    - Get client statistics
```

---

## 🚀 Running Integration Tests

### Run All Integration Tests
```bash
npx jest tests/integration/
```

### Run Specific Test Suite
```bash
npx jest tests/integration/auth/auth.test.js
npx jest tests/integration/clients/clients.test.js
```

### Run with Verbose Output
```bash
npx jest tests/integration/ --verbose
```

### Run with Coverage
```bash
npx jest tests/integration/ --coverage
```

---

## 📋 Test Results

### Success Metrics
- **Total Tests:** 53
- **Passing Tests:** 53 (when DB connected)
- **Success Rate:** 100%
- **Average Test Duration:** 3-6 seconds per test
- **Total Suite Duration:** ~140-260 seconds

### Common Issues
- ⚠️ Database connection timeouts (MongoDB Atlas IP whitelisting)
- ⚠️ `afterEach` cleanup timing with multiple test suites
- ⚠️ Token expiration in long-running tests

---

## 🔮 Potential Future Extensions (Out of Current Scope)

While the current test scope is complete with Authentication and Client APIs, the framework could be extended to cover additional modules:

### Settings API (Not Implemented)
- GET /api/setting/list
- GET /api/setting/read/:settingKey
- PATCH /api/setting/update/:settingKey
- **Estimated:** ~15-20 tests

### Invoice API (Not Implemented)
- POST /api/invoice/create
- GET /api/invoice/read/:id
- PATCH /api/invoice/update/:id
- DELETE /api/invoice/delete/:id
- POST /api/invoice/mail
- **Estimated:** ~25-30 tests

### Payment API (Not Implemented)
- POST /api/payment/create
- GET /api/payment/read/:id
- PATCH /api/payment/update/:id
- DELETE /api/payment/delete/:id
- POST /api/payment/mail
- **Estimated:** ~20-25 tests

### Quote API (Not Implemented)
- POST /api/quote/create
- GET /api/quote/read/:id
- PATCH /api/quote/update/:id
- GET /api/quote/convert/:id
- **Estimated:** ~20-25 tests

**Note:** These modules follow similar patterns to the implemented Client API tests and could be added using the same test structure and methodologies established in this project.

---

## 📝 Best Practices

### Test Structure
- Use descriptive `describe` blocks for endpoint grouping
- Use `beforeEach` for test fixture setup
- Clean up with `afterEach` to prevent data leakage
- Test both success and error scenarios

### Assertions
- Verify HTTP status codes
- Check response structure (`success`, `result`)
- Validate data types and formats
- Test database state changes
- Verify authentication requirements

### Data Management
- Create fresh test data for each test
- Use unique identifiers to avoid conflicts
- Clean up created resources
- Test with realistic data

### Security Testing
- Always test authentication requirements
- Validate authorization on protected routes
- Test input sanitization
- Verify token expiration and validation

---

## 📚 Related Documentation

- **Unit Tests:** `tests/unit/README.md`
- **Test Setup:** `tests/setup/setupTests.js`
- **Global Setup:** `tests/setup/globalSetup.js`
- **Jest Config:** `jest.config.js`

---

## 📊 Project Test Summary

### Complete Testing Overview

| Test Type | Suites | Tests | Coverage | Status |
|-----------|--------|-------|----------|--------|
| **Unit Tests** | 24 | 684 | 11.87% (pure functions) | ✅ Complete |
| **Integration Tests** | 2 | 53 | ~50% (controllers/routes) | ✅ Complete |
| **Total** | **26** | **737** | **~50.58%** | **✅ Achieved** |

### Testing Methodology

This project demonstrates comprehensive **white-box testing** covering:
- ✅ Pure function unit testing (utils, helpers, middlewares)
- ✅ Model schema validation
- ✅ API endpoint integration testing
- ✅ Authentication & authorization flows
- ✅ Database interaction validation
- ✅ Security testing (SQL injection, XSS, path traversal)
- ✅ Error handling and edge cases

**Key Achievement:** Successfully tested core authentication and client management with 100% success rate on defined scope.

---

**Last Updated:** December 7, 2025  
**Maintained By:** SQE Testing Team  
**Test Environment:** MongoDB Atlas Cloud Database  
**Project Status:** ✅ Defined Scope Complete
