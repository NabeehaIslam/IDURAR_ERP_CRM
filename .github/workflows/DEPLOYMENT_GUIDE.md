# CI/CD Pipeline - Staging & Production Deployment Guide

## 📋 Overview

This document provides comprehensive instructions for **Stage 4 (Staging)** and **Stage 5 (Production Deployment)** of the IDURAR ERP/CRM CI/CD pipeline.

**Your Role:** Test Stage Implementation (including automated deployment workflows)

---

## 🎯 CI/CD Pipeline Stages

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Source    │ -> │    Build    │ -> │    Test     │ -> │   Staging   │ -> │ Production  │
│   (GitHub)  │    │  (Jenkins)  │    │  (GitHub    │    │  (AWS/      │    │  (AWS/      │
│             │    │             │    │   Actions)  │    │   Azure)    │    │   Azure)    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
     Step 1             Step 2             Step 3             Step 4             Step 5
```

---

## 🔧 Stage 4: Staging Deployment

### Tools Used:
- **GitHub Actions** (Primary orchestration)
- **AWS CodeDeploy** (Option 1 - AWS deployment)
- **Azure DevOps** (Option 2 - Azure deployment)
- **SSH Deployment** (Option 3 - Custom server)

### Workflow File: `.github/workflows/staging-deployment.yml`

### Trigger Conditions:
1. **Automatic:** After backend tests pass on `develop` branch
2. **Manual:** Workflow dispatch from GitHub Actions UI

### Deployment Process:

#### Step 1: Prerequisites Check
```yaml
# Only runs if tests passed
if: ${{ github.event.workflow_run.conclusion == 'success' }}
```

#### Step 2: Build Application
- Checkout `develop` branch
- Install dependencies (production only)
- Build frontend with staging environment variables
- Create deployment package

#### Step 3: Deploy to Staging Environment

**Option A: AWS CodeDeploy**
```bash
# Create deployment package
tar -czf deployment.tar.gz backend/ frontend/dist/

# Upload to S3
aws s3 cp deployment.tar.gz s3://staging-bucket/deployments/

# Deploy via CodeDeploy
aws deploy create-deployment \
  --application-name IDURAR-ERP-CRM \
  --deployment-group-name Staging-DeploymentGroup
```

**Option B: Azure Web Apps**
```yaml
- uses: azure/webapps-deploy@v2
  with:
    app-name: idurar-staging
    publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
```

**Option C: SSH to Custom Server**
```bash
ssh user@staging-server << 'EOF'
  cd /var/www/idurar-staging
  git pull origin develop
  npm ci --production
  pm2 restart idurar-staging
EOF
```

#### Step 4: Smoke Tests
```bash
# Health check
curl -f https://staging.example.com/api/health

# Basic API test
curl -f https://staging.example.com/api/ping
```

#### Step 5: Integration Tests on Staging
```bash
npx jest tests/integration/ --testTimeout=30000
```

#### Step 6: Manual Exploratory Testing
- Login functionality
- Client CRUD operations
- Invoice generation
- Payment processing
- Dashboard loading
- Settings management

---

## 🚀 Stage 5: Production Deployment

### Tools Used:
- **GitHub Actions** (Primary orchestration)
- **AWS CodeDeploy** (Option 1 - AWS deployment)
- **Azure DevOps Releases** (Option 2 - Azure deployment)
- **Sentry** (Error tracking)
- **New Relic** (Performance monitoring)

### Workflow File: `.github/workflows/production-deployment.yml`

### Trigger Conditions:
1. **Manual Approval Required** (workflow_dispatch)
2. **Version Tags:** Push tags like `v1.0.0`

### Deployment Process:

#### Step 1: Manual Approval
```yaml
environment:
  name: production
  url: https://production.example.com
```
- GitHub requires manual approval from authorized reviewers
- Review deployment details before proceeding

#### Step 2: Pre-Deployment Validation
```bash
# Validate version
echo "Deploying version: v1.0.0"

# Run unit tests one more time
npx jest tests/unit/ --coverage

# Create database backup
mongodump --uri="$PRODUCTION_DATABASE_URL" --out=backup-$(date +%Y%m%d)
```

#### Step 3: Build Production Assets
```bash
# Frontend build with production config
cd frontend
npm run build
# Output: frontend/dist/

# Backend production dependencies
cd backend
npm ci --production
```

#### Step 4: Deploy to Production

**AWS CodeDeploy Strategy:**
```bash
# Create production package
tar -czf production-deployment.tar.gz backend/ frontend/dist/

# Upload to production S3 bucket
aws s3 cp production-deployment.tar.gz s3://production-bucket/deployments/

# Create CodeDeploy deployment
DEPLOYMENT_ID=$(aws deploy create-deployment \
  --application-name IDURAR-ERP-CRM \
  --deployment-group-name Production-DeploymentGroup \
  --s3-location bucket=production-bucket,key=deployments/latest.tar.gz,bundleType=tgz \
  --query 'deploymentId' --output text)

# Wait for deployment to complete
aws deploy wait deployment-successful --deployment-id $DEPLOYMENT_ID
```

**Blue-Green Deployment (SSH):**
```bash
# Pull latest code
git checkout v1.0.0

# Backend deployment
cd backend
npm ci --production

# Zero-downtime restart
pm2 reload idurar-production-backend --update-env

# Frontend deployment
cd frontend
npm run build
sudo cp -r dist/* /var/www/html/idurar-production/

# Reload nginx
sudo nginx -s reload
```

#### Step 5: Initialize Monitoring

**Sentry Release Tracking:**
```bash
# Create new release in Sentry
sentry-cli releases new "v1.0.0"
sentry-cli releases set-commits "v1.0.0" --auto
sentry-cli releases finalize "v1.0.0"

# Mark deployment
sentry-cli releases deploys "v1.0.0" new -e production
```

**New Relic Deployment Marker:**
```bash
curl -X POST 'https://api.newrelic.com/v2/applications/APP_ID/deployments.json' \
  -H 'Api-Key:YOUR_API_KEY' \
  -d '{
    "deployment": {
      "revision": "v1.0.0",
      "changelog": "Production deployment",
      "user": "GitHub Actions"
    }
  }'
```

#### Step 6: Production Health Checks
```bash
# Wait for services to stabilize
sleep 30

# API health check
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://api.example.com/api/health)

if [ "$HEALTH_STATUS" != "200" ]; then
  echo "Health check failed! Initiating rollback..."
  exit 1
fi

# Database connectivity
curl -f https://api.example.com/api/ping
```

#### Step 7: Production Smoke Tests
```bash
# Run critical path tests
npx jest tests/integration/auth/auth.integration.test.js --testTimeout=30000
```

#### Step 8: Post-Deployment Monitoring
- Monitor for 10 minutes automatically
- Check error rates in Sentry
- Verify performance in New Relic
- Review application logs

#### Step 9: Rollback on Failure
```bash
# Automatic rollback if deployment fails
if [ $? -ne 0 ]; then
  echo "Deployment failed! Rolling back..."
  
  # AWS CodeDeploy rollback
  aws deploy stop-deployment --deployment-id $DEPLOYMENT_ID --auto-rollback-enabled
  
  # SSH rollback
  git checkout master  # Rollback to previous stable version
  pm2 restart all
fi
```

---

## 📊 GitHub Secrets Configuration

### Required Secrets for Staging:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `STAGING_API_URL` | Staging API base URL | `https://staging-api.example.com` |
| `STAGING_DATABASE_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster/staging` |
| `STAGING_JWT_SECRET` | JWT secret for staging | `random-secret-key-staging` |
| `STAGING_SSH_HOST` | Staging server IP/hostname | `staging.example.com` |
| `STAGING_SSH_USER` | SSH username | `ubuntu` |
| `STAGING_SSH_KEY` | Private SSH key | `-----BEGIN RSA PRIVATE KEY-----...` |
| `STAGING_S3_BUCKET` | S3 bucket for deployments | `idurar-staging-deployments` |

### Required Secrets for Production:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `PRODUCTION_API_URL` | Production API base URL | `https://api.example.com` |
| `PRODUCTION_DATABASE_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster/production` |
| `PRODUCTION_JWT_SECRET` | JWT secret for production | `random-secret-key-prod` |
| `PRODUCTION_DOMAIN` | Production domain | `example.com` |
| `PRODUCTION_SSH_HOST` | Production server IP | `production.example.com` |
| `PRODUCTION_SSH_USER` | SSH username | `ubuntu` |
| `PRODUCTION_SSH_KEY` | Private SSH key | `-----BEGIN RSA PRIVATE KEY-----...` |
| `PRODUCTION_S3_BUCKET` | S3 bucket for deployments | `idurar-production-deployments` |

### AWS Secrets (if using CodeDeploy):

| Secret Name | Description |
|-------------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_REGION` | AWS region (e.g., `us-east-1`) |

### Azure Secrets (if using Azure DevOps):

| Secret Name | Description |
|-------------|-------------|
| `AZURE_CREDENTIALS` | Azure service principal credentials |
| `AZURE_WEBAPP_NAME` | Azure web app name (staging) |
| `AZURE_WEBAPP_NAME_PROD` | Azure web app name (production) |
| `AZURE_WEBAPP_PUBLISH_PROFILE` | Staging publish profile |
| `AZURE_WEBAPP_PUBLISH_PROFILE_PROD` | Production publish profile |

### Monitoring Secrets:

| Secret Name | Description |
|-------------|-------------|
| `SENTRY_DSN` | Sentry data source name |
| `SENTRY_AUTH_TOKEN` | Sentry authentication token |
| `SENTRY_ORG` | Sentry organization slug |
| `SENTRY_PROJECT` | Sentry project name |
| `NEW_RELIC_LICENSE_KEY` | New Relic license key |
| `NEW_RELIC_API_KEY` | New Relic API key |
| `NEW_RELIC_APP_ID` | New Relic application ID |

### Notification Secrets:

| Secret Name | Description |
|-------------|-------------|
| `SLACK_WEBHOOK` | Slack webhook URL for notifications |

---

## 🔐 Setting Up GitHub Secrets

### Step-by-Step Guide:

1. **Navigate to Repository Settings**
   - Go to: `https://github.com/NabeehaIslam/IDURAR_ERP_CRM`
   - Click **Settings** tab

2. **Access Secrets**
   - Click **Secrets and variables** → **Actions**
   - Click **New repository secret**

3. **Add Each Secret**
   - Name: Use exact names from tables above
   - Value: Paste the secret value
   - Click **Add secret**

4. **Verify Secrets**
   - Go to **Actions** tab
   - Run workflow manually
   - Check if secrets are accessible (they'll show as `***` in logs)

---

## 🧪 Testing Deployment Workflows

### Test Staging Deployment:

```bash
# 1. Create test commit on develop branch
git checkout develop
git commit --allow-empty -m "Test staging deployment"
git push origin develop

# 2. Check GitHub Actions
# Go to: Actions → Deploy to Staging
# Monitor deployment progress

# 3. Verify staging environment
curl https://staging-api.example.com/api/health

# 4. Run integration tests
npx jest tests/integration/ --testTimeout=30000
```

### Test Production Deployment:

```bash
# 1. Create version tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 2. Manually approve in GitHub Actions
# Go to: Actions → Deploy to Production
# Click "Review deployments" → Approve

# 3. Monitor deployment
# Watch logs in GitHub Actions

# 4. Verify production
curl https://api.example.com/api/health

# 5. Check monitoring
# - Sentry: https://sentry.io/
# - New Relic: https://one.newrelic.com/
```

---

## 📈 Monitoring Post-Deployment

### Immediate Checks (0-10 minutes):
- ✅ Health endpoint responding (200 OK)
- ✅ Database connectivity working
- ✅ Authentication API functional
- ✅ Frontend loads correctly
- ✅ No 5xx errors in logs

### Short-term Monitoring (10-60 minutes):
- 📊 Error rate < 1% (Sentry)
- 📊 Response time < 500ms (New Relic)
- 📊 CPU usage < 70% (CloudWatch/New Relic)
- 📊 Memory usage stable
- 📊 No database connection errors

### Long-term Monitoring (1-24 hours):
- 📈 User login success rate > 99%
- 📈 Invoice generation working
- 📈 Payment processing functional
- 📈 No data corruption issues
- 📈 Performance metrics stable

---

## 🔄 Rollback Procedures

### Manual Rollback (SSH):

```bash
# Connect to production server
ssh user@production-server

# Navigate to application directory
cd /var/www/idurar-production

# Checkout previous stable version
git checkout v0.9.9  # Previous working version

# Reinstall dependencies
cd backend
npm ci --production

# Restart services
pm2 restart all

# Verify
curl http://localhost:8888/api/health
```

### Automated Rollback (AWS CodeDeploy):

```bash
# Stop current deployment
aws deploy stop-deployment \
  --deployment-id $DEPLOYMENT_ID \
  --auto-rollback-enabled

# CodeDeploy automatically reverts to previous deployment
```

### Database Rollback:

```bash
# Restore from backup
mongorestore --uri="$PRODUCTION_DATABASE_URL" backup-20241207/
```

---

## 📝 Deployment Checklist

### Pre-Deployment:
- [ ] All tests passing (737 tests)
- [ ] Code reviewed and approved
- [ ] Staging environment validated
- [ ] Database backup created
- [ ] Rollback plan documented
- [ ] Team notified of deployment window

### During Deployment:
- [ ] Monitor deployment logs
- [ ] Check health endpoints
- [ ] Verify database connectivity
- [ ] Test critical user paths
- [ ] Monitor error rates

### Post-Deployment:
- [ ] Health checks passing
- [ ] Smoke tests completed
- [ ] Monitoring tools showing green
- [ ] No error spikes in Sentry
- [ ] Performance metrics normal in New Relic
- [ ] Team notified of successful deployment
- [ ] GitHub release created
- [ ] Documentation updated

---

## 🎯 Success Criteria

### Staging Deployment Success:
✅ Application deployed to staging environment  
✅ Automated tests pass on staging  
✅ Manual exploratory testing completed  
✅ No critical bugs identified  
✅ Performance acceptable  

### Production Deployment Success:
✅ Zero-downtime deployment achieved  
✅ All health checks passing  
✅ Error rate < 0.1%  
✅ Response time < 500ms  
✅ Monitoring tools configured  
✅ No rollback required  

---

## 📞 Support & Troubleshooting

### Common Issues:

**Issue 1: Deployment stuck in pending**
```bash
# Check workflow status
gh run view --log

# Cancel and retry
gh run cancel <run-id>
gh workflow run staging-deployment.yml
```

**Issue 2: Health check fails**
```bash
# Check application logs
pm2 logs idurar-production-backend

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Test locally
curl -v http://localhost:8888/api/health
```

**Issue 3: Database connection error**
```bash
# Test MongoDB connection
mongosh "$PRODUCTION_DATABASE_URL"

# Check environment variables
pm2 env 0

# Restart with new env
pm2 restart all --update-env
```

---

## 📚 Additional Resources

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **AWS CodeDeploy:** https://docs.aws.amazon.com/codedeploy/
- **Azure DevOps:** https://docs.microsoft.com/en-us/azure/devops/
- **Monitoring Setup:** See `MONITORING_SETUP.md`
- **Test Reports:** See `backend/tests/PROJECT_SUMMARY.md`

---

## ✅ Implementation Status

| Stage | Status | Notes |
|-------|--------|-------|
| **Stage 1: Source** | ✅ Complete | GitHub webhooks configured |
| **Stage 2: Build** | ✅ Complete | Jenkins/Gradle pipeline |
| **Stage 3: Test** | ✅ Complete | 737 tests, GitHub Actions |
| **Stage 4: Staging** | ✅ Complete | Workflow created, ready to configure |
| **Stage 5: Production** | ✅ Complete | Workflow created, ready to configure |
| **Monitoring** | ✅ Complete | Sentry & New Relic integration documented |

**Next Steps:** Configure GitHub Secrets and test deployments on actual staging/production servers.
