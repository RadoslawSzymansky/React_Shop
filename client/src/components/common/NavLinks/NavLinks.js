import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';

import LoginModal from '../../features/auth/AuthModal/LoginModalContainer';
import RegisterModal from '../../features/auth/AuthModal/RegisterModalContainer';
import Logout from '../../features/auth/Logout/LogoutContainer';
import UserPanelLink from '../../common/UserPanelLink/UserPanelLinkContainer';
import BasketIcon from '../BasketIcon/BasketIconContainer';

import './NavLinks.scss';

const NavLinks = ({ auth: { isAuthenticated }, authLinks }) => (
  <div className='nav-links'>
    <NavLink exact to='/'>Home</NavLink>
    <NavLink exact to='/contact'>Contact</NavLink>
    <NavLink exact to='/faq'>FAQ</NavLink>
    <BasketIcon />
    { !authLinks ? null : <>
      {
        !isAuthenticated ? (
          <div className="auth-links">
            <LoginModal type='login' />
            <RegisterModal type='register' />
          </div>
        ) : <div className="auth-links">
              <UserPanelLink />
              <Logout />
            </div>
      }
    </>}
  </div>
);

NavLinks.defaultProps = {
  authLinks: true
};

export default NavLinks;