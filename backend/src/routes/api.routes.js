const express = require('express');
const router = express.Router();
const { getRoot, getHealth, postTest } = require('../controllers/api.controller');

// GET /api - Root endpoint
router.get('/', getRoot);

// GET /api/health - Health check endpoint
router.get('/health', getHealth);

// POST /api/test - Test POST endpoint
router.post('/test', postTest);

module.exports = router;
