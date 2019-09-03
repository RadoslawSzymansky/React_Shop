import React from 'react';
import PropTypes from 'prop-types';

const BasketElement = ({ product }) => {
  return (
    <div>
      Product ktory nalezy pobrac bo mam tylko i count
      {console.log(product)}
      {product.name}
    </div>
  );
};

BasketElement.propTypes = {
  product: PropTypes.object.isRequired
};

export default BasketElement;
