const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

// get all products
router.route('/products').get(ProductController.getPosts);

// get products by range
router.route('/posts/range/:startAt/:limit').get(ProductController.getProductsByRange);

module.exports = router;
