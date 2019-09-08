import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../../../common/PageTitle/PageTitle';
import { Button } from 'reactstrap';
import UserSettingsForm from '../UserSettingsForm/UserSettingsFormContainer';

const UserSettings = ({ deleteUser }) => {
  return (
    <div style={{padding: 10}}>
      <PageTitle>Settings</PageTitle>
      <br/>
      <UserSettingsForm buttonLabel="Change name" type='name' />
      <br />
      <UserSettingsForm buttonLabel="Change email" type='email' />
      <br />
      <UserSettingsForm buttonLabel="Change password" type='password' />
      <br />
      <a href='https://gravatar.com/'>
        <Button outline>Change avatar</Button>
      </a>
      <br />
      <br />
      <br />
      <Button outline color='danger' onClick={() => {
        if (window.confirm('Are you sure? This cannot be undone!')) {
          deleteUser();
        }
      }}>Delete account</Button>
    </div>
  );
};

UserSettings.propTypes = {

};

export default UserSettings;
