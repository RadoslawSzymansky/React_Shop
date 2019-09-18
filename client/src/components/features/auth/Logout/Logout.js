import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Translate } from 'react-localize-redux';

const Logout = ({ logout }) => (
  <Button onClick={() => logout()} outline color="danger">
    <Translate id="logout" />
  </Button>
);

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Logout;
