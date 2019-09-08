import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';

import './FavoritesIcon.scss';

const BasketIcon = ({ auth, favorites }) => (
  <NavLink exact to="/favorites" className="favorites-icon" style={{ position: 'relative' }}>
    <FaRegHeart
      style={{ fontSize: 32 }}
    />
    <div className="favorites-circle">
      {
        // eslint-disable-next-line no-nested-ternary
        auth.isAuthenticated && !auth.isLoading ? favorites.length : (
          localStorage.getItem('localFavorites') ? JSON.parse(localStorage.getItem('localFavorites')).length : 0
        )
      }
    </div>
  </NavLink>
);

BasketIcon.propTypes = {
  auth: PropTypes.object.isRequired,
  favorites: PropTypes.number.isRequired,
};

export default BasketIcon;
