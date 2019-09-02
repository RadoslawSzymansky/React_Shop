import React from 'react';
import { Button } from 'reactstrap';

const Logout = ({ logout }) => (
  <Button onClick={() => logout() } outline color='danger'>
    Logout
  </Button>
);

export default Logout;
