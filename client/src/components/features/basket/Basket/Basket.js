import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../../common/Spinner/Spinner';
import BasketList from '../BasketList/BasketList';


const Basket = ({ isAuthenticated, user: { isLoading, basket} }) => {


  switch(true) {
  case  isAuthenticated && !isLoading:
    return <BasketList list={basket} isLoading={isLoading} />;
  
  case isLoading:
    return <Spinner />;
  
  case  !isAuthenticated && !isLoading:
    return <BasketList list={
      localStorage.localBasket ? JSON.parse(localStorage.getItem('localBasket')) : []
    }  isLoading={isLoading} />;
  default:
    return null;
  }
};

Basket.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default Basket;
