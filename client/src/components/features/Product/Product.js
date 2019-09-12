import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Favorite from '../../common/Favorite/FavoriteContainer';
import StarRatings from 'react-star-ratings';

import './Product.scss';

const Product = ({
  product: {
    name, labels, price, img, _id, rates,
  },
}) => (
  <Link to={
    {
      pathname: `/products/${_id}`,
      push: true,
    }
  }
  >
    <div className="product-card">
      <div className="product-labels">
        {labels.map((l) => <div key={l} className={`label__${l}`}>{l}</div>)}
      </div>
      <div className="product-image-wrapper">
        <img src={img} alt={name} className="product-image" />
      </div>
      <div className="rating">
        {rates.length > 0 ? (
          <>
            <StarRatings
              starRatedColor="goldenrod"
              rating={
                rates.map((e) => e.rate).reduce((a, b) => a + b) / rates.length
              }
              starDimension="17px"
              starSpacing="1px"
            />
            <span className="rate">
              {(rates.map((e) => e.rate).reduce((a, b) => a + b) / rates.length)
                .toFixed(1)}
              {' '}
              (
              {rates.length}
              )
            </span>
          </>
        ) : (
          <>
            <StarRatings
              rating={0}
              starDimension="15px"
              starSpacing="1px"
            />
            {' '}
            <span className="rate">
              (0)
            </span>
          </>
        )}
      </div>
      <p className="product-name">{name}</p>
      <div className="product-price">
        $
        {price}
        <Favorite productId={_id} />
      </div>
    </div>
  </Link>
);

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
