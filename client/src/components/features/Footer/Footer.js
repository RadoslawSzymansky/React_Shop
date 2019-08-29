import React from 'react';
import NavLinks from '../../common/NavLinks/NavLinks';

import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="rights">
        All rights reserved
      </div>
      <NavLinks />
    </div>
  );
};

export default Footer;
