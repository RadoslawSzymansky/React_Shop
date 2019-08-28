const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  id: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  author: { type: 'String', required: true },
  likes: { type: Schema.Types.Number, default: 0 }
});

module.exports = mongoose.model('Product', Product);