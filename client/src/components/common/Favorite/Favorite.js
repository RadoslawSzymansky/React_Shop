/* eslint-disable comma-dangle */
import React from 'react';
import { FaHeart } from 'react-icons/all';
import PropTypes from 'prop-types';

import './Favorite.scss';

const Favorite = ({
  productId, favorites, isAuthenticated, addFavorite, removeFavorite,
}) => {
  let favArr;
  let callBack;
  let heartClass;

  if (isAuthenticated) {
    favArr = favorites;
  } else {
    favArr = localStorage.localFavorites ? JSON.parse(localStorage.getItem('localFavorites')) : [];
  }

  if (favArr.some((id) => id === productId)) {
    heartClass = 'heart active';
    callBack = removeFavorite;
  } else {
    heartClass = 'heart disactive';
    callBack = addFavorite;
  }

  const onClick = (e) => {
    e.preventDefault();
    callBack(productId);
  };
  return <FaHeart onClick={(e) => onClick(e)} className={heartClass} />;
};

Favorite.propTypes = {
  favorites: PropTypes.array.isRequired,
  productId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};

export default Favorite;
