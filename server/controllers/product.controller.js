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
    let { limit, name, price, startAt } = req.query;
    limit = parseInt(limit);
    startAt = parseInt(startAt);

    const productFilters = [
      { $skip: startAt },
      { $limit: limit }
    ];

    if (name && !price) {
      if (name === 'a-z') productFilters.unshift({ $sort: { name: 1 } });
      if (name === 'z-a') productFilters.unshift({ $sort: { name: -1 } });
    }

    if (!name && price) {
      if (price === 'lowest') productFilters.unshift({ $sort: { price: 1 } });
      if (price === 'highest') productFilters.unshift({ $sort: { price: -1 } });
    }

    const products = await Product.aggregate(productFilters);

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

// Get Discount Codes
exports.getCodes = (req, res) => {
  res.json([
    {
      name: 'freetransport',
      discountPercent: 1
    },
    {
      name: '2019',
      discountPercent: 10
    },
    {
      name: 'summer',
      discountPercent: 20
    }
  ]);
};