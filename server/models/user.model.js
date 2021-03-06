const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: 'String', required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  favorites: [],
  purchasedHistory: [
    {
      productId: { type: Schema.Types.ObjectId, required: true },
      count: { type: Number, required: true },
      date: {type: Date, default: Date.now }
    }
  ],
  basket: [
    {
      productId: { type: Schema.Types.ObjectId, required: true },
      count: { type: Number, required: true },
      avaibleDiscounts: [],
      price: Number
    }
  ],
  Date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', User);