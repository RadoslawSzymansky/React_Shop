const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user.model');

// Route    /api/users
// Method   POST
// Access   PUBLIC
module.exports.registerUser = [
  [ 
    check('email', 'Please include a valid email adress').isEmail(), 
    check('name', 'Name is required').not().isEmpty(), 
    check('password', 'Password minimun lenght is 5').isLength({ min: 5})
  ], 
  async (req, res) => {
    const errors = validationResult(req);

    // validation of body
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password } = req.body;

    try {
      
      let user = await User.findOne({ email: email.toLowerCase() });

      // check if user already exists
      if(user) {
        res.status(400).json({ msg: 'User already exists'});
      }

      // get gravatar of user
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email: email.toLowerCase(),
        avatar,
        password
      });
      
      // bscrypt password
      const salt = bcrypt.genSaltSync(10);
      user.password = await  bcrypt.hashSync(password, salt);

      await user.save();

      // return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
];

module.exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id).select('-password');
    res.json({ msg: 'User deleted successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};