# Team Member 1 Setup Guide - Source Stage & GitHub Actions

## 👤 Your Role
**Team Member 1 - Source Stage (GitHub/Webhooks)**

You are responsible for:
- GitHub repository configuration
- Adding GitHub Secrets for CI/CD pipeline (at least the test secrets)
- Managing branch permissions
- Merging Arsal's test branch

---

## 🚨 IMPORTANT - What You MUST Do First

**Team Member 3 (Arsal) will give you 2 values from his `.env.test` file:**

1. **DATABASE** - MongoDB connection string
2. **JWT_SECRET** - JWT secret key

**You ONLY need these 2 secrets to make the tests run!**

The staging/production deployment secrets are optional and can be added later when you have actual servers.

---

## 🔐 Step 1: Add GitHub Secrets (REQUIRED)

### Navigate to Repository Settings

1. Go to: **https://github.com/NabeehaIslam/IDURAR_ERP_CRM**
2. Click the **Settings** tab (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** button

---

### Required Secrets - Get from Arsal!

#### 📝 Test Stage Secrets (MUST HAVE)

**Arsal will give you these EXACT values from his `backend/.env.test` file:**

| Secret Name | Arsal's Value | Where It's From |
|-------------|---------------|-----------------|
| `TEST_DATABASE_URL` | `mongodb+srv://i230016_db_user:arsaltemfast2004%24%24@cluster0.ejkehz7.mongodb.net/idurar_test?appName=Cluster0` | His `.env.test` → `DATABASE=...` |
| `TEST_JWT_SECRET` | `test_jwt_secret_key_for_testing_only` | His `.env.test` → `JWT_SECRET=...` |

**How to Add:**

1. **First Secret (Database):**
   - Click **New repository secret**
   - Name: `TEST_DATABASE_URL`
   - Value: `mongodb+srv://i230016_db_user:arsaltemfast2004%24%24@cluster0.ejkehz7.mongodb.net/idurar_test?appName=Cluster0`
   - Click **Add secret**

2. **Second Secret (JWT):**
   - Click **New repository secret**
   - Name: `TEST_JWT_SECRET`
   - Value: `test_jwt_secret_key_for_testing_only`
   - Click **Add secret**

**✅ Done! This is all you need to make tests run on GitHub Actions.**

---

## 📝 Optional Secrets for Staging & Production (Add When Ready)

**Note:** Arsal doesn't have staging/production servers yet, so these are optional for now. The workflows will skip deployment steps if these secrets are missing.

### 🌐 For Staging Deployment (Stage 4)

When you have a staging server, add these secrets:

| Secret Name | Example Value | Description |
|-------------|---------------|-------------|
| `STAGING_API_URL` | `https://staging-api.example.com` | Your staging server API URL |
| `STAGING_DATABASE_URL` | `mongodb+srv://user:pass@cluster/idurar_staging` | Staging MongoDB (different from test DB) |
| `STAGING_JWT_SECRET` | `staging-jwt-secret-different-from-test` | Different from test and production! |

**If deploying via SSH to your own server:**

| Secret Name | Example Value | Description |
|-------------|---------------|-------------|
| `STAGING_SSH_HOST` | `staging.example.com` or `192.168.1.100` | Server IP or hostname |
| `STAGING_SSH_USER` | `ubuntu` or `ec2-user` | SSH username |
| `STAGING_SSH_KEY` | `-----BEGIN RSA PRIVATE KEY-----\n...` | Full private SSH key |
| `STAGING_SSH_PORT` | `22` | SSH port (optional, default 22) |

**If using AWS CodeDeploy:**

| Secret Name | Example Value | Description |
|-------------|---------------|-------------|
| `AWS_ACCESS_KEY_ID` | `AKIAIOSFODNN7EXAMPLE` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | `wJalrXUtnFEMI/K7MDENG/...` | AWS secret key |
| `AWS_REGION` | `us-east-1` | AWS region |
| `STAGING_S3_BUCKET` | `idurar-staging-deployments` | S3 bucket for artifacts |

**If using Azure:**

| Secret Name | Example Value | Description |
|-------------|---------------|-------------|
| `AZURE_CREDENTIALS` | `{"clientId":"...","clientSecret":"..."}` | Azure service principal |
| `AZURE_WEBAPP_NAME` | `idurar-staging` | Azure web app name |
| `AZURE_WEBAPP_PUBLISH_PROFILE` | `<publishData>...</publishData>` | Download from Azure portal |

---

### 🚀 For Production Deployment (Stage 5)

When you have a production server, add these secrets:

| Secret Name | Example Value | Description |
|-------------|---------------|-------------|
| `PRODUCTION_API_URL` | `https://api.example.com` | Production API URL |
| `PRODUCTION_DATABASE_URL` | `mongodb+srv://user:pass@cluster/idurar_production` | Production MongoDB |
| `PRODUCTION_JWT_SECRET` | `super-secure-production-secret-key` | Must be very strong! |
| `PRODUCTION_DOMAIN` | `example.com` | Your production domain |

**If deploying via SSH:**

| Secret Name | Example Value | Description |
|-------------|---------------|-------------|
| `PRODUCTION_SSH_HOST` | `production.example.com` or `192.168.1.200` | Production server IP |
| `PRODUCTION_SSH_USER` | `ubuntu` | SSH username |
| `PRODUCTION_SSH_KEY` | `-----BEGIN RSA PRIVATE KEY-----\n...` | Private SSH key |
| `PRODUCTION_SSH_PORT` | `22` | SSH port (optional) |

**If using AWS/Azure:**
- Same as staging, but use `PRODUCTION_S3_BUCKET`, `AZURE_WEBAPP_NAME_PROD`, etc.

---

### 📊 For Monitoring (Stage 5 - Production Only)

**Sentry - Error Tracking:**

1. Sign up at https://sentry.io/
2. Create project: "IDURAR ERP/CRM"
3. Get DSN: Settings → Projects → Client Keys (DSN)
4. Generate token: Account → API → Auth Tokens (scopes: `project:releases`, `org:read`)

| Secret Name | Where to Get |
|-------------|--------------|
| `SENTRY_DSN` | Sentry → Project Settings → Client Keys |
| `SENTRY_AUTH_TOKEN` | Sentry → Account → API → Auth Tokens |
| `SENTRY_ORG` | Your organization slug |
| `SENTRY_PROJECT` | `idurar-erp-crm` |

**New Relic - Performance Monitoring:**

1. Sign up at https://one.newrelic.com/
2. Get license key: Account → API Keys → License key
3. Get API key: Create new User key
4. Get app ID: APM → Your App → (check URL for app ID number)

| Secret Name | Where to Get |
|-------------|--------------|
| `NEW_RELIC_LICENSE_KEY` | New Relic → Account → API Keys → License key |
| `NEW_RELIC_API_KEY` | New Relic → Account → API Keys → User key |
| `NEW_RELIC_APP_ID` | New Relic → APM → Your App → (from URL) |

**Slack Notifications (Optional):**

1. Go to https://api.slack.com/messaging/webhooks
2. Create app → Incoming Webhooks → Add to workspace
3. Copy webhook URL

| Secret Name | Example |
|-------------|---------|
| `SLACK_WEBHOOK` | `https://hooks.slack.com/services/T00/B00/xxx` |

---

**Important:** Workflows are configured with `continue-on-error: true` for deployment and monitoring steps, so they won't fail if secrets are missing. This means:
- ✅ Tests will always run
- ⚠️ Deployment steps will be skipped if secrets missing
- ⚠️ Monitoring integration will be skipped if secrets missing

---

## 🛡️ Step 2: Set Up Environment Protection Rules

### For Production (When Ready)

When you're ready to deploy to production, set up manual approval:

1. Go to: **Settings** → **Environments**
2. Click **New environment**
3. Name: `production`
4. Click **Configure environment**

5. **Required reviewers:**
   - Check ✅ **Required reviewers**
   - Add yourself and Team Member 2
   - This requires manual approval before production deployment

6. **Deployment branches:**
   - Select **Selected branches**
   - Add rule: `master` or `main`
   - Prevents accidental deployment from other branches

7. Click **Save protection rules**

### For Staging (Optional)

1. Click **New environment**
2. Name: `staging`
3. **Deployment branches:** Select `develop`
4. Click **Save protection rules**

**You can skip this step for now** - it's only needed when you have actual servers.

---

## 📋 Step 3: Verify Workflow Files Exist

Navigate to your repository on GitHub and check if these files exist:

```
.github/workflows/
├── backend-tests.yml              ✅ (Must have - runs tests)
├── staging-deployment.yml         ✅ (Optional - for later)
├── production-deployment.yml      ✅ (Optional - for later)
```

**These files are in Arsal's branch `Arsal-Temuri-Part`**

You'll merge this branch in the next step.

---

## 🔀 Step 4: Merge Arsal's Branch

### Option A: Via GitHub UI (Recommended)

1. Go to: **https://github.com/NabeehaIslam/IDURAR_ERP_CRM/pull/new/Arsal-Temuri-Part**
2. **Base branch:** `develop` (for staging testing first)
3. **Compare branch:** `Arsal-Temuri-Part`
4. Click **Create pull request**
5. Title: `Add Test Stage + Staging/Production Deployment Workflows`
6. Add description (copy from commit message)
7. Click **Create pull request**
8. Review the changes
9. Click **Merge pull request** → **Confirm merge**
10. Delete the `Arsal-Temuri-Part` branch (optional)

### Option B: Via Command Line

```bash
# Switch to develop branch
git checkout develop

# Merge Arsal's branch
git merge Arsal-Temuri-Part

# Push to GitHub
git push origin develop
```

---

## 🧪 Step 5: Test the Pipeline

### Test 1: Backend Tests (Required - Do This First)

1. **Trigger the tests:**
   ```bash
   git checkout develop
   echo "// Test CI/CD" >> README.md
   git add .
   git commit -m "Test: Trigger CI/CD pipeline"
   git push origin develop
   ```

2. **Monitor:**
   - Go to: **Actions** tab → **Backend Tests**
   - Watch workflow run

3. **Expected Results:**
   - ✅ Unit tests: 684 tests pass
   - ✅ Integration tests: 53 tests pass (if secrets added)
   - ⚠️ Integration tests: Skip if secrets missing

**Success looks like:**
```
✅ Run unit tests
  Test Suites: 24 passed, 24 total
  Tests: 684 passed, 684 total

✅ Run integration tests
  Test Suites: 2 passed, 2 total
  Tests: 53 passed, 53 total
```

---

### Test 2: Staging Deployment (Optional - When You Have Server)

**Prerequisites:**
- Backend tests pass
- Staging secrets added
- Have staging server set up

**Trigger Options:**

**Option A: Automatic (after tests pass on develop):**
- Just push to `develop` branch
- If tests pass, staging deployment triggers automatically

**Option B: Manual trigger:**
1. Go to: **Actions** → **Deploy to Staging**
2. Click **Run workflow**
3. Select branch: `develop`
4. Click **Run workflow**

**What happens:**
1. ✅ Builds application (backend + frontend)
2. ✅ Deploys to staging (AWS/Azure/SSH - based on your secrets)
3. ✅ Runs smoke tests on staging
4. ✅ Runs integration tests on staging
5. ✅ Sends Slack notification (if webhook configured)

**Verify staging works:**
```bash
# Check staging health
curl https://staging-api.example.com/api/health
# Should return: {"status":"ok"}

# Test login API
curl -X POST https://staging-api.example.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

**If deployment fails:**
- Check logs in GitHub Actions
- Verify staging secrets are correct
- Ensure staging server is accessible
- Check SSH key format (if using SSH deployment)

---

### Test 3: Production Deployment (Optional - When You Have Server)

**Prerequisites:**
- Staging validated successfully
- Production secrets added
- Environment protection rules configured
- Have production server ready

**Trigger Options:**

**Option A: Version tag (Recommended):**
```bash
git checkout master
git merge develop  # After staging validation
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

**Option B: Manual trigger:**
1. Go to: **Actions** → **Deploy to Production**
2. Click **Run workflow**
3. Enter version: `v1.0.0`
4. Click **Run workflow**

**Approval Process:**
1. GitHub pauses and shows **Waiting for approval**
2. Reviewers get notification
3. Go to workflow → Click **Review deployments**
4. Check ✅ **production**
5. Add comment (optional)
6. Click **Approve and deploy**

**What happens after approval:**
1. ✅ Creates database backup
2. ✅ Runs pre-deployment tests
3. ✅ Builds production assets
4. ✅ Deploys to production (zero-downtime)
5. ✅ Initializes Sentry monitoring
6. ✅ Initializes New Relic monitoring
7. ✅ Runs health checks
8. ✅ Runs smoke tests
9. ✅ Monitors for 10 minutes
10. ✅ Creates GitHub release
11. ✅ Sends notifications

**Verify production:**
```bash
# Health check
curl https://api.example.com/api/health

# Check Sentry for errors
# Visit: https://sentry.io/

# Check New Relic for performance
# Visit: https://one.newrelic.com/
```

**If deployment fails:**
- Automatic rollback triggers
- Previous version restored
- Database rollback available from backup
- Check logs for failure reason

---

### What Each Workflow Does:

**Backend Tests (`backend-tests.yml`):**
- Runs on: Push to `develop` or `master`, PR to these branches
- Jobs: Unit tests (684 tests), Integration tests (53 tests), Security audit, Coverage report
- Time: ~3-5 minutes
- **Always runs** (with or without deployment secrets)

**Staging Deployment (`staging-deployment.yml`):**
- Runs on: After backend tests pass on `develop` branch
- Jobs: Deploy to staging, smoke tests, integration tests on staging, exploratory testing reminder
- Time: ~5-10 minutes
- **Skips deployment if secrets missing** (shows as success with warning)

**Production Deployment (`production-deployment.yml`):**
- Runs on: Manual approval + version tag
- Jobs: Pre-checks, deploy to production, initialize monitoring, health checks, 10-min monitoring
- Time: ~10-15 minutes
- **Requires secrets** (fails if critical secrets missing)

---

## ✅ That's It! You're Done!

**What you've accomplished:**
- ✅ Added GitHub Secrets for test database
- ✅ Merged Arsal's test branch
- ✅ Tests run automatically on every push
- ✅ CI/CD pipeline is active

**What will happen now:**
- Every time someone pushes to `develop` branch, tests run automatically
- You'll see results in the **Actions** tab
- If tests fail, you'll get a red ❌ notification
- If tests pass, you'll see a green ✅ checkmark

---

## 🎯 Summary - What You MUST Do

**Minimum Required Steps (30 minutes):**

1. ✅ Get 2 values from Arsal:
   - DATABASE (from his .env.test)
   - JWT_SECRET (from his .env.test)

2. ✅ Add as GitHub Secrets:
   - Name: `TEST_DATABASE_URL` → Value: Arsal's DATABASE
   - Name: `TEST_JWT_SECRET` → Value: Arsal's JWT_SECRET

3. ✅ Merge Arsal's branch:
   - Go to: https://github.com/NabeehaIslam/IDURAR_ERP_CRM/pull/new/Arsal-Temuri-Part
   - Create pull request
   - Merge to `develop`

4. ✅ Test it works:
   - Push any change to `develop`
   - Check **Actions** tab
   - See tests running

**Optional Later (when you have servers):**
- Add staging/production secrets
- Set up environment protection rules
- Configure Sentry/New Relic monitoring

---

---

## 🐛 Troubleshooting

### Problem: Tests fail with "DATABASE is not defined"

**Solution:**
1. You forgot to add `TEST_DATABASE_URL` secret
2. Or the secret name is wrong (must be exactly `TEST_DATABASE_URL`)
3. Go to Settings → Secrets → Actions
4. Check if secret exists
5. Delete and re-add with exact name

---

### Problem: Tests fail with "connect ECONNREFUSED" or "MongooseError"

**Solution:**
- Arsal's database connection string is wrong
- Ask Arsal to verify his MongoDB is accessible from outside (not localhost)
- MongoDB Atlas must allow access from 0.0.0.0/0 (or at least GitHub Actions IPs)
- Check if database password has special characters (URL encode them)

---

### Problem: Integration tests are skipped

**Solution:**
- This is NORMAL if you haven't added secrets yet
- The workflow is designed to skip integration tests if DATABASE not configured
- It will still show as "success" ✅
- To run integration tests: Add the 2 secrets from Arsal

---

### Problem: Can't merge Arsal's branch - conflicts

**Solution:**
1. Ask Arsal to resolve conflicts first
2. Or merge manually:
   ```bash
   git checkout develop
   git merge Arsal-Temuri-Part
   # Resolve conflicts if any
   git commit
   git push origin develop
   ```

---

### Problem: Workflow doesn't trigger automatically

**Solution:**
1. Check if workflow file exists: `.github/workflows/backend-tests.yml`
2. Make sure you pushed to `develop` or `master` branch
3. Check if file paths match: workflow triggers on `backend/**` changes
4. Try manual trigger: Actions → Backend Tests → Run workflow

---

---

## ✅ Quick Verification Checklist

After completing all steps, verify:

- [ ] Got 2 values from Arsal (DATABASE and JWT_SECRET)
- [ ] Added `TEST_DATABASE_URL` secret in GitHub
- [ ] Added `TEST_JWT_SECRET` secret in GitHub
- [ ] Merged `Arsal-Temuri-Part` branch to `develop`
- [ ] Tests run automatically when you push to `develop`
- [ ] Can see test results in **Actions** tab
- [ ] Tests show green ✅ checkmark (or at least unit tests pass)

**If all checked ✅ then you're done!**

---

## 📞 Need Help?

**Contact Arsal (Team Member 3):**
- For: Database credentials (TEST_DATABASE_URL, TEST_JWT_SECRET)
- For: Questions about test execution
- For: Understanding what tests do

**Resources:**
- GitHub Actions Docs: https://docs.github.com/en/actions
- Project Tests Documentation: `backend/tests/PROJECT_SUMMARY.md`
- This guide: `.github/workflows/TEAM_MEMBER_1_SETUP_GUIDE.md`

---

## 🎯 Success Criteria

You'll know everything is set up correctly when:

1. ✅ You can see workflow runs in **Actions** tab
2. ✅ Unit tests pass (684 tests)
3. ✅ Integration tests pass (53 tests) - if you added secrets
4. ✅ Green checkmark ✅ appears on commits
5. ✅ No errors in workflow logs

---

## 📧 Message Template for Arsal

**Copy and send this to Team Member 1:**

```
Hi [Team Member 1 Name],

Please add these 2 GitHub Secrets to make the tests run:

**Secret 1:**
Name: TEST_DATABASE_URL
Value: mongodb+srv://i230016_db_user:arsaltemfast2004%24%24@cluster0.ejkehz7.mongodb.net/idurar_test?appName=Cluster0

**Secret 2:**
Name: TEST_JWT_SECRET
Value: test_jwt_secret_key_for_testing_only

Steps:
1. Go to: https://github.com/NabeehaIslam/IDURAR_ERP_CRM
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add both secrets exactly as shown above
5. Merge my branch "Arsal-Temuri-Part" to "develop"

That's it! Tests will run automatically after that.

- Arsal
```

---

**Good luck! 🚀**

If you have any questions, ask Team Member 3 (Arsal) or check the documentation files in `.github/workflows/` folder.
