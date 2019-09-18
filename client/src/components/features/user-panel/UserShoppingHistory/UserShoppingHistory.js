/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { Translate } from 'react-localize-redux';
import Spinner from '../../../common/Spinner/Spinner';
import HistoryToast from '../../../common/HistoryToast/HistoryToast';

const UserShoppingHistory = ({ user: { isLoading, purchasedHistory }, getProducts, products }) => {
  useEffect(() => { getProducts(); }, []);

  const list = purchasedHistory
    .map((historyProduct) => {
      let product;
      products.forEach((purchased) => {
        if (historyProduct.productId === purchased._id) {
          product = {
            ...purchased, purchasedCount: historyProduct.count, date: historyProduct.date,
          };
        }
      });
      return product;
    });

  const recentDate = new Date(Math.max.apply(null, list.map((e) => new Date(e.date))));

  const today = new Date(recentDate);
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;

  switch (true) {
  case isLoading:
    return <Spinner />;
  case !isLoading && purchasedHistory.length === 0:
    return <Alert>You haven&apos;t bought anything yet.</Alert>;
  case !isLoading && products.length > 0:
    return (
      <>
        <h6>
          <Translate id="lastShopping" />
          <span className="text-primary">{dateTime}</span>
        </h6>
        {list.map((product, i) => <HistoryToast key={i} product={product} />)}
      </>
    );
  default:
    return null;
  }
};

UserShoppingHistory.propTypes = {
  getProducts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

export default UserShoppingHistory;
