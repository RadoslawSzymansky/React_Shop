const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      userId: { type: Schema.Types.ObjectId, required: true },
      rate: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Product', Product);