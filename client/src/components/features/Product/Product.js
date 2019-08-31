import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Product.scss';

const Product = ({ product: {
  name, labels,  price, img, _id
}}) => {
  return (
    <Link to={`/product/${_id}`}>
      <div className='product-card'>
        <div className="product-labels">
          {labels.map((l, i) => <div key={l + i} className={`label__${l}`}>{l}</div>)}
        </div>
        <div className="product-image-wrapper">
          <img src={img} alt={name} className='product-image' />
          {console.log(img)}
        </div>
        <p className="product-name">{name}</p>
        <div className="product-price">${price}</div>
      </div>
    </Link>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
