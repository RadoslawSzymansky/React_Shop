import React from 'react';
import PropTypes from 'prop-types';
import BasketElement from '../BasketElemen/BasketElementContainer';

const BasketList = ({ list, isLoading }) => (
  <>{
    !list.length && !isLoading ? 'Your basket is empty' : (
      list.map(product => <BasketElement key={product.productId} product={product}/>)
    )
  }</>
);

BasketList.propTypes = {
  list: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default BasketList;
