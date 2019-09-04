import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { loadUserRequest } from './redux/authRedux';
import { concatBasketsRequest, concatFavoritesRequest } from './redux/userRedux';
import { fetchDiscountCodesRequest } from './redux/productsRedux';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Routes from './routing/Routes';

const App = ({ 
  loadUserRequest, isAuthenticated, concatBasketsRequest, concatFavoritesRequest, fetchDiscountCodesRequest
}) => {
  
  useEffect(() => {
    loadUserRequest();
    fetchDiscountCodesRequest();
  },[]);

  useEffect(() => {
    if(isAuthenticated) {
      concatBasketsRequest();
      concatFavoritesRequest();
    }
  }, [isAuthenticated]);

  return (
    <MainLayout>
      <Routes />
    </MainLayout>
  );
};

App.propTypes = {
  loadUserRequest: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  concatBasketsRequest: PropTypes.func.isRequired,
  concatFavoritesRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { 
  loadUserRequest, concatBasketsRequest, concatFavoritesRequest, fetchDiscountCodesRequest 
})(hot(module)(App));

