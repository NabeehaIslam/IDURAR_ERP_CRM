const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

/**
 * Create a test Express app instance
 * @param {Router} router - Express router to test
 * @returns {Express.Application} Test app
 */
function createTestApp(router) {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());

  app.use('/', router);

  // Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  });

  return app;
}

/**
 * Make authenticated request
 * @param {Express.Application} app - Express app
 * @param {String} method - HTTP method (get, post, put, delete)
 * @param {String} url - Request URL
 * @param {String} token - JWT token
 * @returns {Supertest.Test} Supertest request
 */
function authenticatedRequest(app, method, url, token) {
  return request(app)
    [method](url)
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json');
}

module.exports = {
  createTestApp,
  authenticatedRequest,
};
