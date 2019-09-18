import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart, FaShoppingBasket } from 'react-icons/fa';
import { Translate } from 'react-localize-redux';

const UserPanelNavi = () => (
  <nav className="user_panel-nav">
    <div className="nav nav-tabs" id="nav-tab" role="tablist">
      <NavLink to="/user-panel/shopping-history" className="nav-item nav-link">
        <Translate id="history" />
      </NavLink>
      <NavLink to="/user-panel/settings" className="nav-item nav-link">
        <Translate id="settings" />
      </NavLink>
      <NavLink to="/user-panel/favorites" className="nav-item nav-link">
        <span className="d-none d-sm-inline">
          <Translate id="favorites" />
        </span>
        <FaHeart style={{ marginLeft: 5, color: '#DC3545' }} />
      </NavLink>
      <NavLink to="/user-panel/basket" className="nav-item nav-link">
        <span className="d-none d-sm-inline">
          <Translate id="yourBasket" />
        </span>
        <FaShoppingBasket style={{ marginLeft: 5, color: '#3EE4C3' }} />
      </NavLink>
    </div>
  </nav>
);

export default UserPanelNavi;
