import React from 'react';
import NavLinks from '../../common/NavLinks/NavLinksContainer';
import Logo from '../../common/Logo/Logo';

import './Header.scss';

const Header = () => {
  return (
    <div className='header'>
      <Logo />
      <NavLinks />
    </div>
  );
};

export default Header;
