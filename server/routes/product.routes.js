const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/product.controller');

// get all products
router.route('/products').get(ProductController.getPosts);

// get products by range
router.route('/products/range/:startAt/:limit').get(ProductController.getProductsByRange);

// get sorted product with limit

// get single product by id
router.route('/products/sort').get(ProductController.getSortedProducts);

module.exports = router;
