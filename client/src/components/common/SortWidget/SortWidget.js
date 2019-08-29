import React from 'react';
import PropTypes from 'prop-types';

import './SortWidget.scss';

const SortWidget = ({ onClick }) => {
  return (
    <div className="sort-widget">
      <h4 className="title">Sort</h4>
      <ul className='sort-widget__list'>
        <li onClick={() => onClick('a-z')}>Name A-Z</li>
        <li onClick={() => onClick('z-a')}>Name Z-A</li>
        <li onClick={() => onClick('low')}>Lowest price</li>
        <li onClick={() => onClick('high')}>Highest price</li>
      </ul>
    </div>
  );
};

SortWidget.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SortWidget;
