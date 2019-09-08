import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './UserPanelLink.scss';

const UserPaneLink = ({ auth: { user } }) => (
  <>
    {!user ? null : (
      <div className="user-panel-link">
        <Link to="/user-panel" className="link">
          <img src={user.avatar} alt="user" className="user-img" />
          <span>User Panel</span>
        </Link>
      </div>
    )}
  </>
);

UserPaneLink.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default UserPaneLink;
