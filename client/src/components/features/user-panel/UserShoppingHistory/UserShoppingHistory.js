import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import Spinner from '../../../common/Spinner/Spinner';
import HistoryToast from '../../../common/HistoryToast/HistoryToast';

const UserShoppingHistory = ({ user: { isLoading, purchasedHistory }, getProducts, products }) => {
  useEffect(() => { getProducts(); }, []);

  const list = purchasedHistory
    .map((historyProduct) => {
      let product;
      products.forEach(purchased => {
        if (historyProduct.productId === purchased._id) {
          product = {
            ...purchased, purchasedCount: historyProduct.count, date: historyProduct.date
          };
        }
      });
      return product;
    });

  const recentDate = new Date(Math.max.apply(null, list.map(function (e) {
    return new Date(e.date);
  })));

  var today = new Date(recentDate);
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;

  switch(true) {
  case isLoading:
    return <Spinner />;
  case !isLoading && purchasedHistory.length === 0:
    return <Alert>You haven&apos;t bought anything yet.</Alert>;
  case !isLoading && products.length > 0:
   
    return <>
    {console.log(typeof recentDate)}
      <h6>Your last shooping was on <span className="text-primary">{dateTime}</span></h6>
      {list.map(product => <HistoryToast key={product._id} product={product} />)}
    </>;
  default:
    return null;
  }
};

UserShoppingHistory.propTypes = {
  getProducts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
};

export default UserShoppingHistory;
