import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import './UserPanelLink.scss';

const UserPaneLink = ({ auth: { user } }) => {
  return (
    <>
    { !user ? null : (
        <div className='user-panel-link'>
          <Link to='/user-panel' className='link' >
              <img src={user.avatar} alt="user" className='user-img' />
              <span>User Panel</span>
          </Link>
        </div>  
    ) }
    </>
  )
};

export default UserPaneLink;
