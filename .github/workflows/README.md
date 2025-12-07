# GitHub Actions Workflows

This directory contains CI/CD workflows for the IDURAR ERP/CRM project.

## 📋 Available Workflows

### 1. Backend Tests (`backend-tests.yml`)

Automated testing pipeline for the backend application that runs on every push and pull request.

#### Triggers

- **Push** to `master` or `develop` branches (when backend code changes)
- **Pull Request** to `master` or `develop` branches (when backend code changes)

#### Jobs

##### 🧪 Test Job

Runs the complete backend test suite across multiple Node.js versions.

**Strategy:**
- Node.js versions: 18.x, 20.x
- OS: Ubuntu Latest

**Steps:**
1. **Checkout code** - Clone the repository
2. **Setup Node.js** - Install specified Node.js version with npm cache
3. **Install dependencies** - Run `npm ci` for clean install
4. **Run unit tests** - Execute stable unit tests with coverage
5. **Run integration tests** - Execute Auth & Client API tests
6. **Generate combined coverage** - Create comprehensive coverage report
7. **Upload to Codecov** - Send coverage data to Codecov
8. **Upload artifacts** - Store coverage reports (30 days retention)
9. **Comment on PR** - Post coverage summary on pull requests
10. **Test summary** - Display results in GitHub Actions summary

**Environment Variables Required:**
```
TEST_DATABASE_URL - MongoDB connection string for tests
TEST_JWT_SECRET - Secret key for JWT tokens
```

##### 🔍 Lint Job

Code quality and formatting checks.

**Steps:**
1. Checkout code
2. Setup Node.js 18.x
3. Install dependencies
4. Run ESLint
5. Check code formatting

**Note:** Continues on error (won't block PR)

##### 🔒 Security Job

Security vulnerability scanning.

**Steps:**
1. Checkout code
2. Setup Node.js 18.x
3. Run npm audit (moderate level)
4. Run Snyk security scan (high severity threshold)

**Environment Variables Required:**
```
SNYK_TOKEN - Snyk API token for security scanning
```

**Note:** Continues on error (won't block PR)

##### 📊 Summary Job

Aggregates results from all jobs and displays comprehensive summary.

**Depends on:** Test, Lint, Security jobs  
**Always runs:** Even if previous jobs fail

---

## 🚀 Setup Instructions

### 1. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `TEST_DATABASE_URL` | MongoDB connection string for tests | `mongodb+srv://user:pass@cluster.mongodb.net/idurar_test` |
| `TEST_JWT_SECRET` | Secret key for JWT tokens | `your-test-secret-key-minimum-32-chars` |
| `SNYK_TOKEN` | Snyk API token (optional) | `your-snyk-token` |
| `CODECOV_TOKEN` | Codecov token (optional) | `your-codecov-token` |

### 2. Enable GitHub Actions

1. Go to repository **Settings → Actions → General**
2. Under "Actions permissions", select:
   - ✅ **Allow all actions and reusable workflows**
3. Under "Workflow permissions", select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

### 3. Enable Codecov Integration (Optional)

1. Go to [Codecov.io](https://codecov.io/)
2. Sign in with GitHub
3. Add your repository
4. Copy the Codecov token
5. Add as `CODECOV_TOKEN` secret in GitHub

### 4. Enable Snyk Integration (Optional)

1. Go to [Snyk.io](https://snyk.io/)
2. Sign in with GitHub
3. Add your repository
4. Copy the Snyk API token
5. Add as `SNYK_TOKEN` secret in GitHub

---

## 📊 Workflow Outputs

### Coverage Reports

**Location:** GitHub Actions artifacts  
**Retention:** 30 days  
**Format:** HTML, LCOV, JSON

**To download:**
1. Go to Actions tab
2. Click on workflow run
3. Scroll to "Artifacts" section
4. Download `coverage-reports-node-{version}`

### Test Summary

Displayed in GitHub Actions summary page:
- Test job status
- Lint job status
- Security job status
- Coverage statistics
- Test counts (737 tests total)

### PR Comments

For pull requests, coverage report is automatically commented:
- Coverage percentage
- Changed files coverage
- Coverage diff vs base branch

---

## 🔧 Customization

### Running Different Test Suites

Edit the workflow file to run different test combinations:

```yaml
# Fast tests only (< 30s)
- name: Run fast tests
  run: npx jest tests/unit/utils tests/unit/helpers tests/unit/middlewares/inventory

# All stable tests (< 2min)
- name: Run stable tests
  run: npx jest tests/unit/utils tests/unit/helpers tests/unit/middlewares

# Full test suite (< 20min)
- name: Run all tests
  run: npm test
```

### Changing Node.js Versions

Modify the matrix strategy:

```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x, 20.x, 21.x]  # Add/remove versions
```

### Adding More Jobs

Add new jobs to the workflow:

```yaml
jobs:
  performance:
    name: Performance Tests
    runs-on: ubuntu-latest
    steps:
      - name: Run load tests
        run: npm run test:performance
```

---

## 🐛 Troubleshooting

### Issue: Tests Timeout

**Problem:** Tests fail with timeout errors  
**Solution:** Increase timeout in workflow:

```yaml
- name: Run tests
  run: npx jest --testTimeout=90000
```

### Issue: Database Connection Failed

**Problem:** Integration tests fail to connect to MongoDB  
**Solution:** 
1. Verify `TEST_DATABASE_URL` secret is set correctly
2. Check MongoDB Atlas IP whitelist (allow GitHub Actions IPs: 0.0.0.0/0 for test DB)
3. Use local MongoDB or MongoDB memory server

### Issue: Coverage Not Uploaded

**Problem:** Codecov upload fails  
**Solution:**
1. Verify `CODECOV_TOKEN` secret is set
2. Check Codecov service status
3. Review workflow logs for specific error

### Issue: Workflow Not Triggering

**Problem:** Workflow doesn't run on push/PR  
**Solution:**
1. Check workflow file syntax (YAML validation)
2. Verify file path is `.github/workflows/backend-tests.yml`
3. Ensure branch name matches trigger conditions
4. Check if workflow is enabled in repository settings

---

## 📈 Best Practices

### ✅ DO

- ✅ Run fast tests first, slow tests later
- ✅ Use matrix strategy for multiple Node.js versions
- ✅ Cache npm dependencies for faster builds
- ✅ Upload coverage reports as artifacts
- ✅ Use `continue-on-error` for non-critical jobs
- ✅ Add meaningful job names and descriptions
- ✅ Store sensitive data in GitHub secrets

### ❌ DON'T

- ❌ Don't hardcode secrets in workflow file
- ❌ Don't run all tests on every commit (use fast tests)
- ❌ Don't fail workflow for linting errors (use `continue-on-error`)
- ❌ Don't run tests for documentation-only changes
- ❌ Don't use production database for tests

---

## 📚 Related Documentation

- [Backend Test Documentation](../backend/tests/README.md)
- [Test Execution Report](../backend/tests/TEST_EXECUTION_REPORT.md)
- [Coverage Analysis](../backend/tests/COVERAGE_ANALYSIS.md)
- [Test Maintenance Guide](../backend/tests/TEST_MAINTENANCE_GUIDE.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

---

## 🔄 Workflow Status Badge

Add this badge to your main README.md:

```markdown
![Backend Tests](https://github.com/NabeehaIslam/IDURAR_ERP_CRM/workflows/Backend%20Tests/badge.svg)
```

**Displays:**
- ✅ Green badge when tests pass
- ❌ Red badge when tests fail
- 🟡 Yellow badge when tests are running

---

## 📞 Support

**For workflow issues:**
1. Check workflow logs in Actions tab
2. Review this README for troubleshooting
3. Check [GitHub Actions Status](https://www.githubstatus.com/)
4. Contact repository maintainers

**For test issues:**
1. Review [Test Maintenance Guide](../backend/tests/TEST_MAINTENANCE_GUIDE.md)
2. Check test documentation
3. Run tests locally first
4. Review backend test logs

---

## 📊 Current Test Statistics

**As of December 7, 2025:**

| Metric | Value |
|--------|-------|
| **Total Tests** | 737 |
| **Unit Tests** | 684 |
| **Integration Tests** | 53 |
| **Code Coverage** | 50.58% |
| **Pass Rate** | 93.6% |
| **Execution Time** | ~260 seconds |

**Test Scope:**
- ✅ Authentication APIs (22 tests)
- ✅ Client Management APIs (31 tests)
- ✅ Utils, Helpers, Middlewares (296 tests)
- ✅ Models & Settings (388 tests)

---

**Last Updated:** December 7, 2025  
**Workflow Version:** 1.0  
**Maintained By:** SQE Testing Team

---

## 🎯 Quick Reference

### Common Commands

```bash
# Run workflow locally (using act)
act -j test

# Validate workflow syntax
actionlint .github/workflows/backend-tests.yml

# View workflow runs
gh run list --workflow=backend-tests.yml

# View specific run logs
gh run view <run-id>

# Re-run failed jobs
gh run rerun <run-id> --failed
```

### Workflow Triggers

| Event | When |
|-------|------|
| `push` | Code pushed to master/develop |
| `pull_request` | PR opened/updated to master/develop |
| `workflow_dispatch` | Manual trigger (optional) |
| `schedule` | Cron schedule (optional) |

---

## 🏆 Success Criteria

Workflow is successful when:
- ✅ All test jobs pass (or continue-on-error is enabled)
- ✅ Coverage reports are generated
- ✅ Artifacts are uploaded
- ✅ PR comments are posted (for PRs)
- ✅ Summary displays correctly

**The workflow is configured to be informative rather than blocking**, allowing development to continue while maintaining visibility into test and security status.

---

*For questions or improvements to this workflow, please create an issue or pull request.*
