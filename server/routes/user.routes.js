const express = require('express');
const router = express();

const auth = require('../middlewars/auth');

const userController = require('../controllers/user.controller');

// Register User - PUBLIC
router.post('/', userController.registerUser);

// Delete User Account
router.delete('/', auth, userController.deleteUser);

module.exports = router;