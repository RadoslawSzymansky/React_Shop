import React from 'react';
import PropTypes from 'prop-types';

const MainAlert = ({ alerts }) =>
  alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

MainAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default MainAlert;
