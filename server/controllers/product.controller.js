/* eslint-disable no-underscore-dangle */
const { check, validationResult } = require('express-validator');

const Product = require('../models/product.model');
const User = require('../models/user.model');

// Get all products
exports.getPosts = async (req, res) => {
  try {
    res.status(200).json(await Product.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get products by range // pagination
exports.getProductsByRange = async (req, res) => {
  try {
    let {
      // eslint-disable-next-line prefer-const
      limit, name, price, startAt,
    } = req.query;
    limit = parseInt(limit, 10);
    startAt = parseInt(startAt, 10);

    const productFilters = [
      { $skip: startAt },
      { $limit: limit },
    ];

    if (name && !price) {
      if (name === 'a-z') productFilters.unshift({ $sort: { name: 1 } });
      if (name === 'z-a') productFilters.unshift({ $sort: { name: -1 } });
    }

    if (!name && price) {
      if (price === 'lowest') productFilters.unshift({ $sort: { price: 1 } });
      if (price === 'highest') productFilters.unshift({ $sort: { price: -1 } });
    }

    const products = await Product.aggregate(productFilters);

    const amount = await Product.countDocuments();

    res.status(200).json({
      products,
      amount,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get single product by Id
exports.getPost = async (req, res) => {
  try {
    res.status(200).json(await Product.findById(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Discount Codes
exports.getCodes = (req, res) => {
  res.json([
    {
      name: 'newuser',
      discountPercent: 5,
    },
    {
      name: '2019',
      discountPercent: 10,
    },
    {
      name: 'summer',
      discountPercent: 20,
    },
  ]);
};

// path      /api/products/:id/rates
// method    POST
// access    PRIVATE
exports.addOpinion = [[
  check('rate', 'Rate must be number between 0 to 5').isInt({ min: 0, max: 5 }),
  check('name', 'Name is required').not().isEmpty(),
  check('text', 'Opinion text is required').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  // validation of body
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, rate, text } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(id);

    const newOpinion = {
      userId: user._id,
      name,
      rate,
      text,
      avatar: user.avatar,
    };

    product.rates = [...product.rates, newOpinion];
    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).send('Server error');
  }
}];

// path      /api/products/:id/rates/:opinionId/like
// method    PUT
// access    PRIVATE
exports.likeOpinion = async (req, res) => {
  const { id, opinionId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(id);
    const { rates } = product;
    const opinionIndex = rates.findIndex((e) => String(e._id) === String(opinionId));

    if (opinionIndex === -1) return res.status(400).json({ msg: 'Opinion not found' });

    // check if wasn't already liked
    if (rates[opinionIndex].likes.some((e) => String(e.userId) === String(user._id))) {
      return res.status(400).json({ msg: 'Product is already liked' });
    }

    rates[opinionIndex].likes = [...rates[opinionIndex].likes, { userId: req.user.id }];

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

// path      /api/products/:id/rates/:opinionId/unlike
// method    PUT
// access    PRIVATE
exports.unLikeOpinion = async (req, res) => {
  const { id, opinionId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(id);
    const { rates } = product;
    const opinionIndex = rates.findIndex((e) => String(e._id) === String(opinionId));

    if (opinionIndex === -1) return res.status(400).json({ msg: 'Opinion not found' });

    // check if wasn't already liked
    if (!rates[opinionIndex].likes.some((e) => String(e.userId) === String(user._id))) {
      return res.status(400).json({ msg: 'Product is was not liked' });
    }

    rates[opinionIndex].likes = rates[opinionIndex].likes
      .filter((e) => String(e.userId) !== String(req.user.id));

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

// path      /api/products/:id/rates/:opinionId/comments  
// method    POST
// access    PRIVATE
exports.commentOpinion = [[
  check('name', 'Name is required').not().isEmpty(),
  check('text', 'Opinion text is required').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  // validation of body
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, opinionId } = req.params;
  const { text, name } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(id);
    const { rates } = product;
    const opinionIndex = rates.findIndex((e) => String(e._id) === String(opinionId));

    const newComment = {
      userId: user._id,
      name,
      text,
      avatar: user.avatar,
    };

    if (opinionIndex === -1) return res.status(400).json({ msg: 'Opinion not found' });

    rates[opinionIndex].comments = [...rates[opinionIndex].comments, newComment]; 

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).send('Server error');
  }
}];

// path      /api/products/:id/rates/:opinionId/comments/:commentId
// method    DELETE
// access    PRIVATE
exports.deleteCommentOpinion = async (req, res) => {
  const { id, opinionId, commentId } = req.params;

  try {
    const product = await Product.findById(id);
    const { rates } = product;

    const opinionIndex = rates.findIndex((e) => String(e._id) === String(opinionId));
    const { comments } = rates[opinionIndex]

    if (opinionIndex === -1) return res.status(400).json({ msg: 'Opinion not found' });

    const commentIndex = comments.findIndex((e) => String(e._id) === String(commentId));
    const comment = comments[commentIndex]

    if (commentIndex === -1) return res.status(400).json({ msg: 'Comment not found' });

    // check if user is owner
    if (String(comment.userId) !== req.user.id) {
      return res.status(400).json({ msg: 'User is not owner of the comment' });
    }

    rates[opinionIndex].comments = rates[opinionIndex].comments
      .filter((e) => String(e._id) !== String(commentId));

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

// path      /api/products/:id/rates/:opinionId/comments/:commentId/like
// method    PUT
// access    PRIVATE
exports.likeCommentOpinion = async (req, res) => {
  const { id, opinionId, commentId } = req.params;

  try {
    const product = await Product.findById(id);
    const { rates } = product;

    const opinionIndex = rates.findIndex((e) => String(e._id) === String(opinionId));
    const { comments } = rates[opinionIndex]

    if (opinionIndex === -1) return res.status(400).json({ msg: 'Opinion not found' });

    const commentIndex = comments.findIndex((e) => String(e._id) === String(commentId));
    const comment = comments[commentIndex]

    if (commentIndex === -1) return res.status(400).json({ msg: 'Comment not found' });

    // check if user is owner
    if (String(comment.userId) === req.user.id) {
      return res.status(400).json({ msg: 'User cannot like his own comment' });
    }

    // check if wasn't already liked
    if (comment.likes.some((e) => String(e.userId) === String(req.user.id))) {
      return res.status(400).json({ msg: 'Product is already liked' });
    }

    rates[opinionIndex].comments[commentIndex].likes = [
      ...rates[opinionIndex].comments[commentIndex].likes, { userId: req.user.id }
    ];

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

// path      /api/products/:id/rates/:opinionId/comments/:commentId/unlike
// method    PUT
// access    PRIVATE
exports.unLikeCommentOpinion = async (req, res) => {
  const { id, opinionId, commentId } = req.params;

  try {
    const product = await Product.findById(id);
    const { rates } = product;

    const opinionIndex = rates.findIndex((e) => String(e._id) === String(opinionId));
    const { comments } = rates[opinionIndex]

    if (opinionIndex === -1) return res.status(400).json({ msg: 'Opinion not found' });

    const commentIndex = comments.findIndex((e) => String(e._id) === String(commentId));
    const comment = comments[commentIndex]

    if (commentIndex === -1) return res.status(400).json({ msg: 'Comment not found' });

    // check if user is owner
    if (String(comment.userId) === req.user.id) {
      return res.status(400).json({ msg: 'User cannot like his own comment' });
    }

    // check if wasn't already unliked
    if (comment.likes.some((e) => String(e.userId) === String(req.user.id))) {
      return res.status(400).json({ msg: 'Product was not liked yet' });
    }

    rates[opinionIndex].comments[commentIndex].likes = 
      rates[opinionIndex].comments[commentIndex].likes
        .filter((e) => String(e.userId !== req.user.id));
    

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};
