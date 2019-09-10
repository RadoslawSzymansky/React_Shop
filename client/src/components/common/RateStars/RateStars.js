/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/all';

const RateStars = ({ rate, setRate }) => {
  const [cname, setCname] = useState('');
  return (
    <div
      className={`rate-stars ${cname}`}
      onMouseEnter={() => {
        setCname('hovered');
      }}
      onMouseLeave={() => {
        setCname('');
      }}
      onClick={() => {
        setCname('');
      }}
    >
      <span className={1}>
        <FaStar onClick={() => setRate(1)} className={rate >= 1 ? 'active star' : ' star'} />
      </span>
      <FaStar onClick={() => setRate(2)} name={2} className={rate >= 2 ? 'active star' : ' star'} />
      <FaStar onClick={() => setRate(3)} name={3} className={rate >= 3 ? 'active star' : ' star'} />
      <FaStar onClick={() => setRate(4)} name={4} className={rate >= 4 ? 'active star' : ' star'} />
      <FaStar onClick={() => setRate(5)} name={5} className={rate >= 5 ? 'active star' : ' star'} />
    </div>
  );
};

RateStars.propTypes = {
  rate: PropTypes.number.isRequired,
  setRate: PropTypes.func.isRequired,
};

export default RateStars;
