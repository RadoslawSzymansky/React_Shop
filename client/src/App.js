import React from 'react';
import { hot } from 'react-hot-loader';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Routes from './components/routing/Routes';

class App extends React.Component {   
  render() {
    return (
      <MainLayout>
        <Routes />
      </MainLayout>
    );
  }
}

export default hot(module)(App);

