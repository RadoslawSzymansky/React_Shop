import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const MainAlert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(
  (alert) => (
    <Alert
      style={
        {
          zIndex: 99999, position: 'fixed', top: 0, left: 0, right: 0, textAlign: 'center',
        }
      }
      key={alert.id}
      color={alert.alertType}
    >
      {alert.msg}
    </Alert>
  ),
);

MainAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default MainAlert;
