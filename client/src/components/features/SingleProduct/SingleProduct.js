import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Spinner, Alert } from 'reactstrap';

import './SingleProduct.scss';

const SingleProduct = ({
  product, fetchProduct, request, match, addToBasket, setAlert
}) => {
  useEffect(() => {
    fetchProduct(match.params.id);
  }, []);

  const [ count, setCount ] = useState(1);

  const { pending, error, success } = request;

  const sendProduct = () => {
    if(count <= 0) return setAlert('Count must be positive!', 'danger');
    addToBasket({ productId: product._id, count, avaibleDiscounts: product.avaibleDiscounts, price: product.price });
  };

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
          <div className="count">
            <label htmlFor="count">Count: </label>
            <input value={count} id='count' onChange={(e) => setCount(e.target.value)} type="number"  />
          </div>
          <Button onClick={sendProduct} color='primary' disabled={!product.instore}>
            Add To Basket
          </Button>
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
  instore: PropTypes.number,
  addToBasket: PropTypes.func.isRequired
};

export default withRouter(SingleProduct);