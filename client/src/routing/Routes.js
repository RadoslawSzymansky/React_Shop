import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import HomePage from '../components/pages/Home/HomePage';
import NotFound from '../components/pages/NotFound/NotFoundPage';
import ProductPage from '../components/pages/Product/ProductPage';
import BasketPage from '../components/pages/Basket/BasketPage';
import ContactPage from '../components/pages/Contact/ContactPage';
import PrivatePage from '../components/pages/PrivatePage/PrivatePage';
import FavoritesPage from '../components/pages/FavoritesPage/FavoritesPage';
import UserPanelPage from '../components/pages/UserPanel/UserPanelContainer';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/products/:id" exact component={ProductPage} />
    <Route path="/basket" exact component={BasketPage} />
    <Route path="/contact" exact component={ContactPage} />
    <Route path="/private" exact component={PrivatePage} />
    <Route path="/favorites" exact component={FavoritesPage} />
    <PrivateRoute path="/user-panel" component={UserPanelPage} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
