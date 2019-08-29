import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';

import './NavLinks.scss';

class NavLinks extends React.Component {

  render() {
    return (
      <div className='nav-links'>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink exact to='/contact'>Contact</NavLink>
        <NavLink exact to='/faq'>FAQ</NavLink>
        <NavLink exact to='/basket' className='basket-icon'>
          <FaShoppingBasket 
            style={{fontSize: 32, transform: 'translateY(8px)'}}
          />
        </NavLink>
      </div>
    );
  }
}

export default NavLinks;