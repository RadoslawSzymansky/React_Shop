/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product/Product';

import './ProductsList.scss';

const ProductsList = ({ products }) => (
  <div className="products-list">
    {products.map((product) => <Product key={product._id} product={product} />)}
  </div>
);

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsList;
