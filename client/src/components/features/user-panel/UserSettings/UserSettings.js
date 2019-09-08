import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import PageTitle from '../../../common/PageTitle/PageTitle';
import UserSettingsForm from '../UserSettingsForm/UserSettingsFormContainer';

const UserSettings = ({ deleteUser }) => (
  <div style={{ padding: 10 }}>
    <PageTitle>Settings</PageTitle>
    <br />
    <UserSettingsForm buttonLabel="Change name" type="name" />
    <br />
    <UserSettingsForm buttonLabel="Change email" type="email" />
    <br />
    <UserSettingsForm buttonLabel="Change password" type="password" />
    <br />
    <a href="https://gravatar.com/">
      <Button outline>Change avatar</Button>
    </a>
    <br />
    <br />
    <br />
    <Button
      outline
      color="danger"
      onClick={() => {
        // eslint-disable-next-line no-alert
        if (window.confirm('Are you sure? This cannot be undone!')) {
          deleteUser();
        }
      }}
    >
      Delete account
    </Button>
  </div>
);

UserSettings.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

export default UserSettings;
