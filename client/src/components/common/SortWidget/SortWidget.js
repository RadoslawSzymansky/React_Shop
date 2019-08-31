import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

import './SortWidget.scss';

const SortWidget = ({ onClick }) => {
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
            <li onClick={() => onClick('a-z')}>Name A-Z</li>
            <li onClick={() => onClick('z-a')}>Name Z-A</li>
            <li onClick={() => onClick('low')}>Lowest price</li>
            <li onClick={() => onClick('high')}>Highest price</li>
          </ul>
        </> : null}
    </div>
  );
};

SortWidget.propTypes = {
  onClick: PropTypes.func
};

export default SortWidget;

