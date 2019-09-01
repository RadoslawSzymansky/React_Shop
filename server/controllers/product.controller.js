const Product = require('../models/product.model');

// Get all products
exports.getPosts = async (req, res) => {

  try {
    res.status(200).json(await Product.find());
  } catch (err) {
    res.status(500).json(err);
  }

};

// Get products by range // pagination
exports.getProductsByRange = async function (req, res) {

  try {
    let { startAt, limit } = req.params;

    startAt = parseInt(startAt);
    limit = parseInt(limit);

    const products = await Product.find().skip(startAt).limit(limit);
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

// Get Products by Range and Filters

exports.getSortedProducts = async (req, res) => {

  try {
    let { limit, name, price } = req.query;
    limit = parseInt(limit);

    const productFilters = [
      { $limit: limit }
    ];

    if (name && !price ) {
      if (name === 'a-z')  productFilters.unshift({ $sort: { name: 1 } });
      if (name === 'z-a') productFilters.unshift({ $sort: { name: -1 } });
    }

    if (!name && price) {
      if (price === 'lowest') productFilters.unshift({ $sort: { price: 1 } });
      if (price === 'highest') productFilters.unshift({ $sort: { price: -1 } });
    }

    if (!name && !price || !limit) {
      return res.status(400).json({ message: 'Bad values, limit && price or name required' });
    }
   
    const products = await Product.aggregate(productFilters);

    const amount = await Product.countDocuments();
    console.log(products)
    res.status(200).json({
      products,
      amount,
    });

  } catch (err) {
    res.status(500).json(err);
  }

};