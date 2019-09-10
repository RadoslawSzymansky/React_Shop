const mongoose = require('mongoose');

const { Schema } = mongoose;

const Product = new Schema({
  name: { type: 'String', required: true },
  description: { type: 'String', required: true },
  category: { type: 'String', required: true },
  instore: { type: Schema.Types.Number, default: 0 },
  img: { type: 'String', default: 'http://formatka.efstudioar.nazwa.pl/galeria/default.jpg' },
  price: { type: Number, required: true },
  labels: { type: Array },
  oldprice: { type: Number },
  rates: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
      },
      rate: { type: Number, required: true },
      text: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String },
      likes: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      comments: [{
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'users',
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
        },
        likes: [
          {
            userId: {
              type: Schema.Types.ObjectId,
              ref: 'users',
            },
          },
        ],
        date: {
          type: Date,
          default: Date.now,
        },
      }],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  avaibleDiscounts: ['newuser'],
});

module.exports = mongoose.model('Product', Product);
