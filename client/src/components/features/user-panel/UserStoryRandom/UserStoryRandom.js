import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ProductHistoryElement from '../../../common/ProductHistoryElement/ProductHistory';

const UserStoryRandom = ({ getProducts, isLoading, purchasedHistory, purchasedProducts }) => {


  useEffect(() => {
    getProducts();
  }, []);


  let startAt;

  if (purchasedHistory.length >= 5) {
    startAt = Math.floor(Math.random() * purchasedHistory.length - 5) + 1;
  } else {
    startAt = 0;
  }

  const randomList = purchasedHistory
    .slice(startAt, startAt + 5)
    .map((random, i) => {
      let product;
      purchasedProducts.forEach(purchased => {
        if (random.productId === purchased._id) {
          product = {
            ...purchased, purchasedCount: random.count
          };
        }
      });
      return product;
    });


  const [activeIndex, setActiveIndex] = useState(0);
  const [ animating, setAnimating ] = useState(false);
 
  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);    
  };

  const next = () => {
    if(animating) return;
    const nextIndex = activeIndex === randomList.length - 1 ? 0 : activeIndex + 1;
    console.log('zmieniam index', nextIndex)
    setActiveIndex(nextIndex)
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? randomList.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex)
  };

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex)
  };


  switch(true) {
  case isLoading:
    return '...Loading';
  
  case !isLoading && randomList[4] !== undefined:
    {' znowu case'}
    return (
      <div>
        {randomList.map(e=> <ProductHistoryElement product={e} />)}
      </div>
    );

  default: 
    return null;
  }
};

UserStoryRandom.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

export default UserStoryRandom;
