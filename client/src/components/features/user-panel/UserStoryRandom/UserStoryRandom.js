import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import ProductHistoryElement from '../../../common/ProductHistoryElement/ProductHistory';

const UserStoryRandom = ({ getProducts, isLoading, purchasedHistory, purchasedProducts }) => {
  const referenceForSetTimeout = useRef(null)

  useEffect(() => {
    getProducts();
  }, []);


  let startAt;

  if (purchasedHistory.length >= 5) {
    startAt = Math.floor(Math.random() * (purchasedHistory.length - 5)) + 1;
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const changeIndex = () => {
    setCurrentIndex(prev => currentIndex === 4 ? 0 : prev + 1);
  };

  useEffect(() => {

    referenceForSetTimeout.current = setInterval(() => {
      changeIndex();
    }, 3000);

    return () => {
      clearInterval(referenceForSetTimeout.current);
    };

  }, [currentIndex]);

  switch (true) {
  case isLoading:
    return '...Loading';

  case randomList[currentIndex] !== undefined:
    return (
      <>
        <h4 className='text-center'>You have recently bought:</h4>
        <br />
        <ProductHistoryElement product={randomList[currentIndex]} />
      </>
    );

  default:
    return null;
  }
};

UserStoryRandom.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

export default UserStoryRandom;
