/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/all';
import PropTypes from 'prop-types';

import './Favorite.scss';

const Favorite = ({
  productId, favorites, isAuthenticated, addFavorite, removeFavorite,
}) => {
  const [bigger, setBigger] = useState(false);
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
    setBigger(true);
  };
  return (
    <FaHeart
      onClick={(e) => onClick(e)}
      onAnimationEnd={() => setBigger(false)}
      className={bigger ? `${heartClass} bigger` : heartClass}
    />
  );
};

Favorite.propTypes = {
  favorites: PropTypes.array.isRequired,
  productId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};

export default Favorite;
