import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../../../common/PageTitle/PageTitle';
import { Button } from 'reactstrap';

const UserSettings = ({ user }) => {
  return (
    <div style={{padding: 10}}>
      <PageTitle>Settings</PageTitle>
      <br/>
      <Button outline>Change name</Button>
      <br />
      <br />
      <Button outline>Change email</Button>
      <br />
      <br />
      <Button outline>Change avatar</Button>
      <br />
      <br />
      <Button outline>Change password</Button>
      <br />
      <br />
      <br />
      <Button outline color='danger'>Delete account</Button>
    </div>
  );
};

UserSettings.propTypes = {

};

export default UserSettings;
