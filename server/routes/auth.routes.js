const express = require('express');
const router = express.Router();

const auth = require('../middlewars/auth');

const AuthController = require('../controllers/auth.controller');

// @ALL : /api/auth

// Get User - PRIVATE
router.route('/').get(auth, AuthController.getUser);

// Autthenticate User - public
router.route('/').post(AuthController.authenticateUser);

module.exports = router;
