const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user.model');

// Route '/api/auth'
// Method GET
// access PRIVATE
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Route     /api/auth
// Method    POST
// access    PUBLIC
module.exports.authenticateUser = [
  [check('email', 'Email is required').not().isEmpty(), check('password', 'password is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Invalid credentials!' });
    }

    const { password, email } = req.body;

    try {
      const user = await User.findOne({ email: email.toLowerCase() });

      // check if user exists
      if (!user) {
        return res.status(400).json({ msg: 'User does not exists!' });
      }

      // check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // send token
      const payload = {
        user: { id: user.id },
      };

      return jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  },
];
