import React from 'react';
import NavLinks from '../../common/NavLinks/NavLinksContainer';

import './Footer.scss';

const Footer = () => (
  <div className="footer">
    <div className="rights">
      All rights reserved
    </div>
    <NavLinks authLinks={false} />
  </div>
);


export default Footer;
