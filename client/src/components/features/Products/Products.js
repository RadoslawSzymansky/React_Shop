import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Spinner } from 'reactstrap';
import Pagination from '../../common/Pagination/Pagination';
import ProductsList from '../ProductsList/ProductsList';

const Products = ({
  initialPage, productsPerPage, products, productsRequest, fetchProductsByPage, pagination, pages, curPage
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  useEffect( () =>  {
    fetchProductsByPage(currentPage, productsPerPage );
  }, [currentPage]);

  const renderContent = () => {
    const { pending, error, success } = productsRequest;

    switch (true) {
    case pending && !success:
      return <div style={{textAlign: 'center', paddingTop: 20}}>
        <Spinner color='primary' style={{ width: '10rem', height: '10rem' }} />
      </div> ;

    case !pending && success:
      return <>
        <ProductsList products={products} />
        <div style={{justifyContent: 'center', display: 'flex', marginTop: 10}}>
          {pagination ? <Pagination pages={pages} setPage={setCurrentPage} page={curPage} /> : null}
        </div>
      </>;
  
    case !pending && error:
      return <Alert color='danger'>{error}</Alert>;

    case !pending && success && products.length === 0:
      return <Alert color='info'>No posts...</Alert>;

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
  pagination: PropTypes.bool,
  pages: PropTypes.number.isRequired
};

export default Products;
