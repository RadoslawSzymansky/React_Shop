import React from 'react';
import PropTypes from 'prop-types';

const ProductsList = ({products}) => {
  return (
    <div>
      {products.map(() => 'a')}
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsList;
