import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Product.scss';

const Product = ({
  product: {
    name, img, _id, purchasedCount,
  },
}) => (
  <Link
    className="random"
    to={
      {
        pathname: `/products/${_id}`,
        push: true,
      }
    }
  >
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={img} alt={name} className="product-image" />
      </div>
      <p className="product-name">{name}</p>
      <div className="product-price">
        You bought
        {purchasedCount}
      </div>
    </div>
  </Link>
);

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
