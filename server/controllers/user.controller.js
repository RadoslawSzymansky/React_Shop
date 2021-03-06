/* eslint-disable eqeqeq */
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user.model');
const Product = require('../models/product.model');

// Route    /api/users
// Method   POST
// Access   PUBLIC
module.exports.registerUser = [
  [
    check('email', 'Please include a valid email adress').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password minimun lenght is 5').isLength({ min: 5 }),
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
      if (user) {
        res.status(400).json({ msg: 'User already exists' });
      }

      // get gravatar of user
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email: email.toLowerCase(),
        avatar,
        password,
      });
      // bscrypt password
      const salt = bcrypt.genSaltSync(10);
      user.password = await bcrypt.hashSync(password, salt);

      await user.save();

      // return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
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
      return res.status(500).send('Server error');
    }
  },
];

// Route    /api/users/basket
// Method   POST
// Access   PRIVATE
module.exports.addToBasket = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const { productToBasket } = req.body;

    if (user.basket.some((e) => e.productId == productToBasket.productId)) {
      user.basket = user.basket.map((e) => {
        if (e.productId == productToBasket.productId) {
          e.count = productToBasket.count;
        }
        return e;
      });
    } else {
      user.basket = [...user.basket, productToBasket];
    }

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Route    /api/users/basket
// Method   DELETE
// Access   PRIVATE
module.exports.deleteFromBasket = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.basket = user.basket.filter((e) => e.productId != req.params.id);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Route    /api/users/favorites
// Method   PUT
// Access   PRIVATE
module.exports.addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = [...user.favorites, req.params.id];
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Route    /api/users/favorites
// Method   DELETE
// Access   PRIVATE
module.exports.deleteFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter((e) => e !== req.params.id);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Route    /api/users/basket/concat
// Method   PUT
// Access   PRIVATE
module.exports.concatLocalBasket = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const newBasket = [...user.basket];

    req.body.localBasket.forEach((l) => {
      if (newBasket.some((e) => e.productId == l.productId)) return;
      newBasket.push(l);
    });

    user.basket = newBasket;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Route    /api/users/favorites/concat
// Method   PUT
// Access   PRIVATE
module.exports.concatLocalFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    req.body.localFavorites.forEach((e) => {
      if (user.favorites.some((u) => u === e)) return;
      user.favorites.push(e);
    });
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Route    /api/users/basket/buy
// Method   PATCH
// Access   PRIVATE
module.exports.buyProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.basket.length === 0) {
      return res.status(400).send({ msg: 'Basket is empty!' });
    }

    user.basket.forEach(async (basketProduct) => {
      const product = await Product.findById(basketProduct.productId);
      product.instore -= basketProduct.count;
      await product.save();
    });

    user.purchasedHistory = [
      ...user.purchasedHistory, ...user.basket,
    ];
    user.basket = [];

    await user.save();

    return res.json(user);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

// Route    /api/users/history/all
// Method   GET
// Access   PRIVATE
module.exports.getHistoryProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const randomProducts = await Product
      .find({ _id: { $in: user.purchasedHistory.map((e) => e.productId) } });
    res.json(randomProducts);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Route    /api/users/settings/password/change
// Method   POST
// Access   PRIVATE
module.exports.changePassword = [
  [
    check('newPassword', 'New password is required').not().isEmpty().isLength({ min: 5 }),
    check('newPassword', 'New password must have at least 5 letters').isLength({ min: 5 }),
    check('oldPassword', 'Old password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // validation of body
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);

      const { newPassword, oldPassword } = req.body;

      if (!bcrypt.compareSync(oldPassword, user.password)) {
        return res.status(400).json({ errors: [{ msg: 'Old password is not correct!' }] });
      }

      // bscrypt password
      const salt = bcrypt.genSaltSync(10);
      user.password = await bcrypt.hashSync(newPassword, salt);

      await user.save();
      return res.json(user);
    } catch (error) {
      return res.status(500).send('Server error');
    }
  },
];

// Route    /api/users/settings/email/change
// Method   POST
// Access   PRIVATE
module.exports.changeEmail = [
  [
    check('email', 'Email is required!').not().isEmpty(),
    check('email', 'Email is not valid!').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // validation of body
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const user = await User.findById(req.user.id);
      user.email = email;

      await user.save();
      return res.json(user);
    } catch (error) {
      return res.status(500).send('Server error');
    }
  },
];

// Route    /api/users/settings/name/change
// Method   POST
// Access   PRIVATE
module.exports.changeName = [
  [
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name minimun lenght is 4').isLength({ min: 5 }),
    check('name', 'Name max lenght is 20').isLength({ max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // validation of body
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const user = await User.findById(req.user.id);
      user.name = name;
      await user.save();

      return res.json(user);
    } catch (error) {
      return res.status(500).send('Server error');
    }
  },
];

// Route    /api/users
// Method   DELETE
// Access   PRIVATE
module.exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id).select('-password');
    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
