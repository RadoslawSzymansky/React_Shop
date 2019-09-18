import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Translate } from 'react-localize-redux';

import PageTitle from '../../../common/PageTitle/PageTitle';
import UserSettingsForm from '../UserSettingsForm/UserSettingsFormContainer';

const UserSettings = ({ deleteUser }) => (
  <div style={{ padding: 10 }}>
    <PageTitle>Settings</PageTitle>
    <br />
    <UserSettingsForm
      buttonLabel={<Translate id="changeName" />}
      type="name"
    />
    <br />
    <UserSettingsForm buttonLabel={<Translate id="changeEmail" />} type="email" />
    <br />
    <UserSettingsForm buttonLabel={<Translate id="changePass" />} type="password" />
    <br />
    <a href="https://gravatar.com/">
      <Button outline>
        <Translate id="change" />
        avatar
      </Button>
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
      <Translate id="delete" />
      <Translate id="account" />
    </Button>
  </div>
);

UserSettings.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};

export default UserSettings;
