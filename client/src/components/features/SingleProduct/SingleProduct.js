import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Spinner, Alert } from 'reactstrap';

import './SingleProduct.scss';

const SingleProduct = ({
  product, fetchProduct, request, match, img, instore
}) => {
  useEffect(() => {
    fetchProduct(match.params.id);
  }, []);

  const { pending, error, success } = request;

  switch (true) {

  case pending && !success:
    return <div style={{ textAlign: 'center', paddingTop: 20 }}>
      <Spinner color='primary' style={{ width: '10rem', height: '10rem' }} />
    </div>;

  case !pending && success:
    return (
      <div className='single-product row'>
        <div className=" col-sm-6">
          <div className="image-wrapper">
            <img className='product-image' src={product.img} alt="Product photo" />
          </div>
        </div>
        <div className=" col-sm-6">
          <h5 className="name">{product.name}</h5>
          <h6 className="price">${product.price}</h6>
          <p className="description">{product.description}</p>
          <p className='text-secondary'>In store: <span className='text-dark'>{product.instore}</span></p>
          <Button color='primary' disabled={!product.instore}>Add To Basket</Button>
        </div>
      </div>
    );

  case !pending && error:
    return <Alert color='danger'>{error}</Alert>;

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
  instore: PropTypes.number
};

export default withRouter(SingleProduct);
