/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

import Spinner from '../../../common/Spinner/Spinner';
import ProductHistoryElement from '../../../common/ProductHistoryElement/ProductHistory';

const UserStoryRandom = ({
  getProducts, isLoading, purchasedHistory, purchasedProducts, user,
}) => {
  const referenceForSetTimeout = useRef(null);

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
    .map((random) => {
      let product;
      purchasedProducts.forEach((purchased) => {
        if (random.productId === purchased._id) {
          product = {
            ...purchased, purchasedCount: random.count,
          };
        }
      });
      return product;
    });

  const [currentIndex, setCurrentIndex] = useState(0);

  const changeIndex = () => {
    // eslint-disable-next-line no-confusing-arrow
    setCurrentIndex((prev) => currentIndex === 4 ? 0 : prev + 1);
  };

  useEffect(() => {
    referenceForSetTimeout.current = setInterval(() => {
      changeIndex();
    }, 3000);

    return () => {
      clearInterval(referenceForSetTimeout.current);
    };
  }, [currentIndex]);


  const userInfo = (
    <div className="p-3 my-2 rounded bg-secondary">
      <Toast>
        <ToastHeader>
          {user.name}
        </ToastHeader>
        <ToastBody>
          <h5>
            Email:
            <span className="text-info">{user.email}</span>
          </h5>
          <br />
          <h5>
            You have liked
            <span className="text-info">
              {user.favorites.length}
            </span>
            products
          </h5>
          <h5>
            You have
            <span className="text-info">{user.basket.length}</span>
            products in basket
          </h5>
          <h5>
            You have bought
            <span className="text-info">{user.purchasedHistory.length}</span>
            products
          </h5>
        </ToastBody>
      </Toast>
    </div>
  );
  switch (true) {
  case isLoading:
    return (
      <>
        {userInfo}
        <Spinner />
      </>
    );

  case randomList[currentIndex] !== undefined:
    return (
      <>
        {userInfo}
        <br />
        <h4 className="text-center">You have recently bought:</h4>
        <ProductHistoryElement product={randomList[currentIndex]} />
      </>
    );

  default:
    return userInfo;
  }
};

UserStoryRandom.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

export default UserStoryRandom;
