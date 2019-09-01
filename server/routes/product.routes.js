const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

// get all products
router.route('/products').get(ProductController.getPosts);

// get products by range
router.route('/products/range/sort').get(ProductController.getProductsByRange);

// get single product by id
router.route('/products/:id').get(ProductController.getPost);

module.exports = router;
