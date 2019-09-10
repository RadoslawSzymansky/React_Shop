/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Opinion from '../Opinion/OpinionContainer';

const OpinionList = ({ opinions }) => (
  <ul className="opinions-list">
    {opinions.map((e) => <Opinion opinion={e} key={e._id} />)}
  </ul>
);

OpinionList.propTypes = {
  opinions: PropTypes.array.isRequired,
};

export default OpinionList;
