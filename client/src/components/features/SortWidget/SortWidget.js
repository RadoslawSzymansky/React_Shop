/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import { Translate } from 'react-localize-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import './SortWidget.scss';

const SortWidget = ({ sortProducts }) => {
  const [isOpen, setIsOpen] = useState(true);

  const onResize = (width) => {
    if (width < 230) return setIsOpen(true);
    return setIsOpen(false);
  };

  return (
    <div className="sort-widget">
      <ReactResizeDetector handleWidth onResize={onResize} />
      <div className="title" onClick={() => setIsOpen(!isOpen)}>
        <Translate id="sort" />
      </div>
      {isOpen ? (
        <CSSTransitionGroup
          transitionName="list"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionAppear={true}
          transitionAppearTimeout={200}
        >
          <ul className="sort-widget__list">
            <li onClick={() => sortProducts({ name: 'a-z' })}>
              <Translate id="name" />
              {' '}
              A-Z
            </li>
            <li onClick={() => sortProducts({ name: 'z-a' })}>
              <Translate id="name" />
              {' '}
              Z-A
            </li>
            <li onClick={() => sortProducts({ price: 'lowest' })}>
              <Translate id="lowest" />
              {' '}
              <Translate id="price" />
            </li>
            <li onClick={() => sortProducts({ price: 'highest' })}>
              <Translate id="highest" />
              {' '}
              <Translate id="price" />
            </li>
            <li onClick={() => sortProducts({ rate: 'true' })}>
              <Translate id="highest" />
              {' '}
              <Translate id="rate" />
            </li>
          </ul>
        </CSSTransitionGroup>
      ) : null}
    </div>
  );
};

SortWidget.propTypes = {
  sortProducts: PropTypes.func.isRequired,
};

export default SortWidget;
