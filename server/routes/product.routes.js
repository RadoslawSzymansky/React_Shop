const express = require('express');
const auth = require('../middlewars/auth');

const router = express.Router();

const ProductController = require('../controllers/product.controller');

// get all products
router.route('/products').get(ProductController.getPosts);

// get single product by id
router.route('/products/codes').get(ProductController.getCodes);

// get products by range
router.route('/products/range/sort').get(ProductController.getProductsByRange);

// get single product by id
router.route('/products/:id').get(ProductController.getPost);

// add opinion to product
router.route('/products/:id/rates').post(auth, ProductController.addOpinion);

// like product opinion
router.route('/products/:id/rates/:opinionId/like').put(auth, ProductController.likeOpinion);

// like product opinion
router.route('/products/:id/rates/:opinionId/unlike').put(auth, ProductController.unLikeOpinion);

// comment product opinion
router.route('/products/:id/rates/:opinionId/comments').post(auth, ProductController.commentOpinion);

// comment product opinion
router.route('/products/:id/rates/:opinionId/comments/:commentId').delete(auth, ProductController.deleteCommentOpinion);

// like product opinion
router.route('/products/:id/rates/:opinionId/comments/:commentId/like').put(auth, ProductController.likeCommentOpinion);

// unlike product opinion
router.route('/products/:id/rates/:opinionId/comments/:commentId/unlike').put(auth, ProductController.unLikeCommentOpinion);

module.exports = router;
