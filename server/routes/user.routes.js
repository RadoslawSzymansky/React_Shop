const express = require('express');
const router = express();

const auth = require('../middlewars/auth');

const userController = require('../controllers/user.controller');

// Register User - PUBLIC
router.post('/', userController.registerUser);

// Delete User Account
router.delete('/', auth, userController.deleteUser);

// Concat user basket with local basket
router.put('/basket/concat', auth, userController.concatLocalBasket);

// Concat user basket with local basket
router.put('/favorites/concat', auth, userController.concatLocalFavorites);

// Concat user favorites with local favorites
router.put('/basket/concat', auth, userController.concatLocalFavorites);

// Add product do basket
router.put('/basket', auth, userController.addToBasket);

// Delete product from basket
router.delete('/basket/:id', auth, userController.deleteFromBasket);

// Add product to favorites
router.put('/favorites/:id', auth, userController.addToFavorites);

// Delete product from favorites
router.delete('/favorites/:id', auth, userController.deleteFromFavorites);

// Buy products
router.patch('/basket/buy', auth, userController.buyProducts);

// Get all products from history
router.get('/history/all', auth, userController.getHistoryProducts);

// Change user password
router.post('/settings/password/change', auth, userController.changePassword);

// Change user email
router.post('/settings/email/change', auth, userController.changeEmail);

// Change user name
router.post('/settings/name/change', auth, userController.changeName);



module.exports = router;