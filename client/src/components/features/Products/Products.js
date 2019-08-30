import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

const Products = ({
  initialPage, productsPerPage, products, productsRequest, fetchProductsByPage, pagination
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  useEffect( async () =>  {
    console.log('pobieram liste');
    // fetchProductsByPage(currentPage, productsPerPage );
  }, []);

  const renderContent = () => {
    const { pending, error, success } = productsRequest;

    switch (true) {
    case pending && !success:
      return <Spinner color='primary' />;
    default:
      return null;
    }
  };
  
  return renderContent();
};

Products.defaultProps = {
  pagination: true,
  productsPerPage: 10
};

Products.propTypes = {
  initialPage: PropTypes.number,
  productsPerPage: PropTypes.number,
  products: PropTypes.array.isRequired,
  productsRequest: PropTypes.object.isRequired,
  fetchProductsByPage: PropTypes.func.isRequired,
  pagination: PropTypes.bool
};

export default Products;
