const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { authenticateToken, authorize } = require('../middleware/auth');

// POST /api/auth/login - Login público
router.post('/login', login);

// POST /api/auth/register - Registro (apenas admin)
router.post('/register', authenticateToken, authorize('admin'), register);

module.exports = router;
