import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const Logout = ({ logout }) => (
  <Button onClick={() => logout()} outline color="danger">
    Logout
  </Button>
);

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Logout;
