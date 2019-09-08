/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleLoginModal } from '../redux/authRedux';
import { setAlert } from '../redux/alertsRedux';

const PrivateRoute = ({
  component: Component, auth: {
    isAuthenticated, isLoading,
  }, name, setAlert, toggleLoginModal, ...rest
}) => {
  if (!isAuthenticated && !isLoading) {
    toggleLoginModal();
    setAlert(`Login to get access to ${name}`);
  }

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) => !isAuthenticated && !isLoading
        ? <Redirect to="/private" push />
        : (<Component {...props} />)}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  toggleLoginModal: PropTypes.func.isRequired,
  component: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { toggleLoginModal, setAlert })(PrivateRoute);
