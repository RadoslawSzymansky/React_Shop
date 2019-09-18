import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import LoginModal from '../../features/auth/AuthModal/LoginModalContainer';
import RegisterModal from '../../features/auth/AuthModal/RegisterModalContainer';
import Logout from '../../features/auth/Logout/LogoutContainer';
import UserPanelLink from '../UserPanelLink/UserPanelLinkContainer';
import BasketIcon from '../BasketIcon/BasketIconContainer';
import FavoritesIcon from '../FavoritesIcon/FavoritesIconContainer';

import './NavLinks.scss';

const NavLinks = ({ auth: { isAuthenticated }, authLinks }) => (
  <div className="nav-links">
    <NavLink exact to="/">
      <Translate id="home" />
    </NavLink>
    <NavLink exact to="/contact">
      <Translate id="contact" />
    </NavLink>
    <NavLink exact to="/faq">FAQ</NavLink>
    <BasketIcon />
    <FavoritesIcon />
    { !authLinks ? null : (
      <>
        {
          !isAuthenticated ? (
            <div className="auth-links">
              <LoginModal type="login" />
              <RegisterModal type="register" />
            </div>
          ) : (
            <div className="auth-links">
              <UserPanelLink />
              <Logout />
            </div>
          )
        }
      </>
    )}
  </div>
);

NavLinks.defaultProps = {
  authLinks: true,
};

NavLinks.propTypes = {
  auth: PropTypes.object.isRequired,
  authLinks: PropTypes.bool,
};

export default NavLinks;
