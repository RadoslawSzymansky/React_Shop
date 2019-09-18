/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import en from '../../../images/en.png';
import pl from '../../../images/pl.png';

const LanguageControl = ({ setActiveLanguage }) => (
  <div className="langs">
    <div className="flag-wrap">
      <img onClick={() => setActiveLanguage('en')} src={en} alt="" className="flag-img" />
      <img onClick={() => setActiveLanguage('pl')} src={pl} alt="" className="flag-img pl" />
    </div>
  </div>
);

LanguageControl.propTypes = {
  setActiveLanguage: PropTypes.func.isRequired,
};

export default LanguageControl;
