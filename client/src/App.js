import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import  './styles/App.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import HomePage from './components/pages/Home/HomePage';
import NotFound from './components/pages/NotFound/NotFoundPage';
import ProductPage from './components/pages/Product/ProductPage';
import BasketPage from './components/pages/Basket/BasketPage';
import ContactPage from './components/pages/Contact/ContactPage';

class App extends React.Component {   
  render() {
    return (
      <MainLayout>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/product/:id' exact component={ProductPage} />
          <Route path='/basket' exact component={BasketPage} />
          <Route path='/contact' exact component={ContactPage} /> 
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    );
  };
};

export default hot(module)(App);

