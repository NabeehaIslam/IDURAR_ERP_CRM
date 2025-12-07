# Monitoring & Error Tracking Setup

## 🔍 Overview

This document explains how to integrate monitoring and error tracking tools for production deployment, as required in the SQE project CI/CD pipeline Stage 5.

---

## 📊 Monitoring Tools Integration

### 1. Sentry - Error Tracking & Performance Monitoring

**Purpose:** Real-time error tracking, crash reporting, and performance monitoring

#### Backend Integration (Node.js/Express)

**Step 1: Install Sentry SDK**
```bash
cd backend
npm install @sentry/node @sentry/profiling-node
```

**Step 2: Initialize Sentry in `backend/src/server.js`**
```javascript
const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");

// Initialize Sentry FIRST (before other imports)
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // 100% of transactions
  // Profiling
  profilesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'production',
  release: process.env.npm_package_version,
});

// Add Sentry request handler (must be first middleware)
app.use(Sentry.Handlers.requestHandler());

// Add Sentry tracing middleware
app.use(Sentry.Handlers.tracingHandler());

// ... your routes ...

// Add Sentry error handler (must be before other error handlers)
app.use(Sentry.Handlers.errorHandler());
```

**Step 3: Add to `.env.production`**
```bash
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ORG=your-org-name
SENTRY_PROJECT=idurar-erp-crm
SENTRY_AUTH_TOKEN=your-auth-token
```

#### Frontend Integration (React/Vite)

**Step 1: Install Sentry SDK**
```bash
cd frontend
npm install @sentry/react @sentry/vite-plugin
```

**Step 2: Initialize in `frontend/src/main.jsx`**
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
});
```

**Step 3: Add to `frontend/.env.production`**
```bash
VITE_SENTRY_DSN=https://your-frontend-sentry-dsn@sentry.io/project-id
```

#### GitHub Secrets Configuration

Add these secrets in: **Settings → Secrets and variables → Actions → New repository secret**

```
SENTRY_DSN              → Your backend Sentry DSN
SENTRY_AUTH_TOKEN       → Sentry authentication token
SENTRY_ORG              → Your organization slug
SENTRY_PROJECT          → idurar-erp-crm
```

**Get Sentry Auth Token:**
1. Go to https://sentry.io/settings/account/api/auth-tokens/
2. Create new token with `project:releases` and `org:read` scopes
3. Copy token to GitHub Secrets

---

### 2. New Relic - Application Performance Monitoring (APM)

**Purpose:** Real-time performance monitoring, transaction tracking, database query analysis

#### Backend Integration (Node.js)

**Step 1: Install New Relic Agent**
```bash
cd backend
npm install newrelic
```

**Step 2: Create `backend/newrelic.js` configuration**
```javascript
'use strict'

exports.config = {
  app_name: ['IDURAR ERP/CRM - Production'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  
  logging: {
    level: 'info'
  },
  
  // Performance monitoring
  allow_all_headers: true,
  
  // Distributed tracing
  distributed_tracing: {
    enabled: true
  },
  
  // Transaction tracer
  transaction_tracer: {
    enabled: true,
    transaction_threshold: 'apdex_f',
    record_sql: 'obfuscated',
    explain_threshold: 500
  },
  
  // Error collector
  error_collector: {
    enabled: true,
    ignore_status_codes: [404]
  },
  
  // Browser monitoring
  browser_monitoring: {
    enable: true
  }
}
```

**Step 3: Load New Relic FIRST in `backend/src/server.js`**
```javascript
// Must be the FIRST require/import
if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}

const express = require('express');
// ... rest of your imports
```

**Step 4: Add to `.env.production`**
```bash
NEW_RELIC_LICENSE_KEY=your-license-key-here
NEW_RELIC_APP_NAME="IDURAR ERP/CRM - Production"
NEW_RELIC_LOG_LEVEL=info
```

#### Frontend Integration (Browser Monitoring)

**Step 1: Get Browser monitoring script from New Relic**
1. Go to New Relic → Browser → Add more data
2. Copy the browser agent script

**Step 2: Add to `frontend/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- New Relic Browser Agent -->
    <script type="text/javascript">
      // Paste New Relic browser agent code here
    </script>
    
    <!-- Rest of your head tags -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### GitHub Secrets Configuration

```
NEW_RELIC_LICENSE_KEY   → Your New Relic license key
NEW_RELIC_API_KEY       → New Relic API key for deployments
NEW_RELIC_APP_ID        → Your application ID
```

**Get New Relic License Key:**
1. Go to https://one.newrelic.com
2. Click your account → API keys
3. Create new license key
4. Copy to GitHub Secrets

---

### 3. AWS CloudWatch (Optional - if using AWS)

**Purpose:** Infrastructure monitoring, log aggregation, metrics, alarms

#### Setup CloudWatch Logs

**Step 1: Install CloudWatch SDK**
```bash
cd backend
npm install winston-cloudwatch
```

**Step 2: Configure Winston logger with CloudWatch**
```javascript
const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new WinstonCloudWatch({
      logGroupName: '/aws/idurar-erp-crm/production',
      logStreamName: `${process.env.NODE_ENV}-${new Date().toISOString().split('T')[0]}`,
      awsRegion: process.env.AWS_REGION,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    })
  ]
});

module.exports = logger;
```

**Step 3: Use logger in your application**
```javascript
const logger = require('./config/logger');

app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});
```

---

## 🚨 Alert Configuration

### Sentry Alerts

**Configure in Sentry Dashboard:**
1. Go to **Alerts → Create Alert**
2. Set conditions:
   - Error rate > 10 errors/minute
   - Response time > 2 seconds
   - New issue created (critical errors)
3. Configure notifications:
   - Slack: `#production-alerts`
   - Email: team@example.com
   - PagerDuty (for critical)

### New Relic Alerts

**Configure Alert Policies:**
```
1. High Error Rate
   - Condition: Error rate > 5%
   - Duration: 5 minutes
   - Notification: Slack + Email

2. Slow Response Time
   - Condition: Response time > 2 seconds
   - Duration: 5 minutes
   - Notification: Slack

3. High CPU Usage
   - Condition: CPU > 80%
   - Duration: 10 minutes
   - Notification: Email + PagerDuty

4. Database Query Slow
   - Condition: Database query > 1 second
   - Duration: 5 minutes
   - Notification: Slack
```

---

## 📈 Dashboard Setup

### Sentry Dashboard

**Key Metrics to Track:**
- Error rate by endpoint
- Most frequent errors
- User-affected errors
- Performance by transaction
- Release health score

### New Relic Dashboard

**Custom Dashboard Widgets:**
1. **Response Time**: Average API response time
2. **Throughput**: Requests per minute
3. **Error Rate**: Percentage of failed requests
4. **Apdex Score**: User satisfaction metric
5. **Database Queries**: Slowest queries
6. **External Services**: Third-party API performance

---

## 🔧 Testing Monitoring Setup

### Test Sentry Integration

```javascript
// backend/tests/monitoring/sentry.test.js
const Sentry = require('@sentry/node');

describe('Sentry Integration', () => {
  test('should capture exceptions', () => {
    try {
      throw new Error('Test error for Sentry');
    } catch (error) {
      Sentry.captureException(error);
    }
    
    // Check Sentry dashboard for this error
  });
  
  test('should track performance', () => {
    const transaction = Sentry.startTransaction({
      op: 'test',
      name: 'Test Transaction'
    });
    
    // Simulate work
    setTimeout(() => {
      transaction.finish();
    }, 100);
  });
});
```

### Test New Relic Integration

```bash
# Check if New Relic is loaded
node -e "require('newrelic'); console.log('New Relic loaded successfully')"

# Run application and check logs
npm start

# Should see: "New Relic for Node.js is running"
```

---

## 📝 Deployment Integration

Both monitoring tools are integrated in the **production-deployment.yml** workflow:

```yaml
- name: Initialize Sentry monitoring
  run: |
    sentry-cli releases new "$VERSION"
    sentry-cli releases set-commits "$VERSION" --auto
    sentry-cli releases deploys "$VERSION" new -e production

- name: Configure New Relic monitoring
  run: |
    curl -X POST 'https://api.newrelic.com/v2/applications/${{ secrets.NEW_RELIC_APP_ID }}/deployments.json' \
      -H 'Api-Key:${{ secrets.NEW_RELIC_API_KEY }}' \
      -d '{"deployment": {"revision": "${{ github.sha }}"}}'
```

---

## 🎯 Monitoring Checklist

- [ ] Sentry DSN configured in production environment
- [ ] New Relic license key added to production
- [ ] CloudWatch log groups created (if using AWS)
- [ ] Alert policies configured in both platforms
- [ ] Slack webhook integrated for notifications
- [ ] Team members added to monitoring platforms
- [ ] Dashboard widgets created
- [ ] Error tracking tested with sample errors
- [ ] Performance metrics visible in dashboards
- [ ] Deployment markers appearing in monitoring tools

---

## 📞 Support Resources

**Sentry:**
- Documentation: https://docs.sentry.io/
- Dashboard: https://sentry.io/
- Status: https://status.sentry.io/

**New Relic:**
- Documentation: https://docs.newrelic.com/
- Dashboard: https://one.newrelic.com/
- Status: https://status.newrelic.com/

**AWS CloudWatch:**
- Documentation: https://docs.aws.amazon.com/cloudwatch/
- Console: https://console.aws.amazon.com/cloudwatch/

---

## 🔐 Security Notes

- Never commit monitoring API keys to Git
- Use environment variables or GitHub Secrets
- Rotate API keys quarterly
- Use separate projects for staging/production
- Mask sensitive data in error logs
- Configure IP allowlists where possible
