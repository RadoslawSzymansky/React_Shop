import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './BasketSummary.scss';

const BasketSummary = ({  addCode, isAuthenticated, code, getPrice, totalPrice }) => {
  const [ value, setValue ] = useState('');
  getPrice()
  const onAddCode = (e) => {
    e.preventDefault();
    if(!value.length) return;
    addCode(value);
    setValue('');
  };

  return (
    <div className='basket-summary'>
      {code ? <>
        <p className="code-info">
          You are using code: <span className='label'>{code.name}</span>
        </p>
        <p className="code-info">
          Current discount is: <span className='label'>{code.discountPercent}%</span>
        </p>
        </> : ''}
      <form onSubmit={onAddCode}>
        <input value={value} onChange={e => setValue(e.target.value)} className='code-input' type="text" placeholder='discount code'/>
        <Button color='primary'>{code ? 'Change discount code' : 'Add code'}</Button>
      </form>
      <p className="info">Promotions are not connecting, you can use only one code</p>

      <div className="total-price">
        <h4>TOTAL: ${totalPrice}</h4>
      </div>
      <div className="buy-action">
        <Button className='btn-buy'>Buy</Button>
      </div>
    </div>
  );
};

BasketSummary.propTypes = {
  addCode: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  code: PropTypes.oneOfType([
    PropTypes.object,
    null
  ])
};

export default BasketSummary;
