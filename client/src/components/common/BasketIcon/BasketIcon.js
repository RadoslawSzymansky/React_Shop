import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';

import './BasketIcon.scss';

const BasketIcon = ({ auth, products }) => (
  <NavLink exact to="/basket" className="basket-icon" style={{ position: 'relative' }}>
    <FaShoppingBasket
      style={{ fontSize: 32 }}
    />
    <div className="basket-circle">
      {
        // eslint-disable-next-line no-nested-ternary
        auth.isAuthenticated && !auth.isLoading ? products.length : (
          localStorage.getItem('localBasket') ? JSON.parse(localStorage.getItem('localBasket')).length : 0
        )
      }
    </div>
  </NavLink>
);

BasketIcon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
  products: PropTypes.number.isRequired,
};

export default BasketIcon;
