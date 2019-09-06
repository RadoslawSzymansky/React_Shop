import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import ProductsList from '../../features/ProductsList/ProductsList';
import Spinner from '../../common/Spinner/Spinner';

const Favorites = ({ isAuthenticated, favorites, fetchProduct, favoriteProducts, userLoading, isLoading }) => {
  let favArray = isAuthenticated ? favorites 
    : (localStorage.localFavorites ? JSON.parse(localStorage.getItem('localFavorites')) : []);
  useEffect(() => {
    favArray.forEach(e => fetchProduct(e));
  },[userLoading]);

  if (Object.keys(favoriteProducts).length === favArray.length && favArray.length > 0) {
    return <ProductsList products={Object.values(favoriteProducts)} />;
  } else if (!userLoading && !isLoading && !favArray.length) {
    return <Alert>You haven't add any products to favorites yet..</Alert>;
  } else {
    return <Spinner/>;
  }

};

Favorites.propTypes = {

};

export default Favorites;
