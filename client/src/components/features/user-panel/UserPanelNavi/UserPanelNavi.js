import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart, FaShoppingBasket } from 'react-icons/fa';

const UserPanelNavi = () => (
  <nav className="user_panel-nav">
    <div className="nav nav-tabs" id="nav-tab" role="tablist">
      <NavLink to="/user-panel/shopping-history" className="nav-item nav-link">
        <span className="d-none d-sm-inline">Shopping</span>
        History
      </NavLink>
      <NavLink to="/user-panel/settings" className="nav-item nav-link">
        Settings
      </NavLink>
      <NavLink to="/user-panel/favorites" className="nav-item nav-link">
        <span className="d-none d-sm-inline">Favorites </span>
        <FaHeart style={{ marginLeft: 5, color: '#DC3545' }} />
      </NavLink>
      <NavLink to="/user-panel/basket" className="nav-item nav-link">
        <span className="d-none d-sm-inline">Your Basket </span>
        <FaShoppingBasket style={{ marginLeft: 5, color: '#3EE4C3' }} />
      </NavLink>
    </div>
  </nav>
);

export default UserPanelNavi;
