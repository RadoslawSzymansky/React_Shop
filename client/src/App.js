import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { loadUserRequest } from './redux/authRedux';
import { concatBasketsRequest, concatFavoritesRequest } from './redux/userRedux';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Routes from './routing/Routes';

const App = ({ loadUserRequest, isAuthenticated, concatBasketsRequest, concatFavoritesRequest }) => {
  
  useEffect(() => {
    loadUserRequest();
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
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loadUserRequest, concatBasketsRequest, concatFavoritesRequest })(hot(module)(App));

