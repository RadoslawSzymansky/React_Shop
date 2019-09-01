import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const MainAlert = ({ alerts }) =>
  alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <Alert key={alert.id} color={alert.type}>
      {alert.msg}
    </Alert>
  ));

MainAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default MainAlert;
