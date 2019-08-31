import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/NotFound/NotFoundPage';
import ProductPage from '../pages/Product/ProductPage';
import BasketPage from '../pages/Basket/BasketPage';
import ContactPage from '../pages/Contact/ContactPage';


const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/products/:id' exact component={ProductPage} />
      <Route path='/basket' exact component={BasketPage} />
      <Route path='/contact' exact component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
