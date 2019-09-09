/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Spinner, Alert } from 'reactstrap';

import './SingleProduct.scss';

const SingleProduct = ({
  product, fetchProduct, request, match, addToBasket, setAlert, basket,
}) => {
  useEffect(() => {
    fetchProduct(match.params.id);
  }, []);

  const [count, setCount] = useState(1);

  const { pending, error, success } = request;

  const sendProduct = () => {
    if (count <= 0) return setAlert('Count must be positive!', 'danger');
    return addToBasket({
      productId: product._id,
      count,
      avaibleDiscounts: product.avaibleDiscounts,
      price: product.price,
    });
  };

  const isInBasket = () => basket.some((e) => e.productId === product._id);

  switch (true) {
  case pending && !success:
    return (
      <div style={{ textAlign: 'center', paddingTop: 20 }}>
        <Spinner color="primary" style={{ width: '10rem', height: '10rem' }} />
      </div>
    );

  case !pending && success:
    return (
      <div className="single-product row">
        <div className="col-sm-6">
          <div className="image-wrapper">
            <img className="product-image" src={product.img} alt="Product" />
          </div>
        </div>
        <div className=" col-sm-6">
          <h5 className="name">{product.name}</h5>
          <h6 className="price">
            $
            {product.price}
          </h6>
          <p className="description">{product.description}</p>
          {product.instore === 0 ? <Alert color="danger">Product is not avaible</Alert> : (
            <>
              <p className="text-secondary">
                In store:
                <span className="text-dark">
                  {' '}
                  {product.instore}
                </span>
              </p>
              <p className="info">{isInBasket() ? 'Product is already in basket' : ''}</p>
              <div className="count">
                <label htmlFor="count">Count: </label>
                <input value={count} id="count" onChange={(e) => setCount(e.target.value)} type="number" />
              </div>
              <Button onClick={sendProduct} color="primary" disabled={!product.instore}>
                {isInBasket() ? 'Change count' : 'Add To Basket'}
              </Button>
            </>
          )}
        </div>
      </div>
    );

  case !pending && error:
    return <Alert color="danger">{error}</Alert>;

  default:
    return null;
  }
};

SingleProduct.propTypes = {
  match: PropTypes.object,
  fetchProduct: PropTypes.func.isRequired,
  product: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  request: PropTypes.object.isRequired,
  img: PropTypes.string,
  instore: PropTypes.number,
  addToBasket: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  basket: PropTypes.array.isRequired,
};

export default withRouter(SingleProduct);
