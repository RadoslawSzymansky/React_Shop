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