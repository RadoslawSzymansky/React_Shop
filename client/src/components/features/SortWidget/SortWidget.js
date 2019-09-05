import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

import './SortWidget.scss';

const SortWidget = ({ sortProducts }) => {
  const [ isOpen, setIsOpen ] = useState(true);

  const onResize = (width) => {
    if (width < 230) return setIsOpen(true);
    setIsOpen(false);
  };  

  return (
    <div className="sort-widget" >
      <ReactResizeDetector handleWidth onResize={onResize} />
      <div className="title" onClick={() => setIsOpen(!isOpen)}>Sort</div>
      {isOpen ? <> 
          <ul className='sort-widget__list'>
            <li onClick={() => sortProducts({ name: 'a-z' })}>Name A-Z</li>
            <li onClick={() => sortProducts({ name: 'z-a' })}>Name Z-A</li>
            <li onClick={() => sortProducts({ price: 'lowest' })}>Lowest price</li>
            <li onClick={() => sortProducts({ price: 'highest' })}>Highest price</li>
          </ul>
        </> : null}
    </div>
  );
};

SortWidget.propTypes = {
  onClick: PropTypes.func
};

export default SortWidget;
