const express = require('express');
const router = express();

const userController = require('../controllers/user.controller');

// Register User - PUBLIC
router.post('/', userController.registerUser);

module.exports = router;