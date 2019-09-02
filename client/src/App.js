import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { loadUserRequest } from './redux/authRedux';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Routes from './routing/Routes';

const App = ({ loadUserRequest }) => {
  
  useEffect(() => {
    loadUserRequest()
  },[]);

  return (
    <MainLayout>
      <Routes />
    </MainLayout>
  );
};

export default connect(null, { loadUserRequest })(hot(module)(App));

