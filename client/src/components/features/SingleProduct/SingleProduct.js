import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Spinner, Alert } from 'reactstrap';

const SingleProduct = ({
  product, fetchProduct, request, match
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
        <div className="col-6">

        </div>
        <div className="col-6">
          <h4 className="name">{product.name}</h4>
          <h5 className="price">{product.price}</h5>
          <p className="description">{product.description}</p>
          <Button disabled={!product.instore}>Add To Basket</Button>
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
  request: PropTypes.object.isRequired
};

export default withRouter(SingleProduct);
