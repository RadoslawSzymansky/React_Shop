import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { toggleLoginModal } from '../redux/authRedux';
import { setAlert } from '../redux/alertsRedux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, isLoading }, name, setAlert, toggleLoginModal, ...rest }) => 
{ 
  if (!isAuthenticated && !isLoading) { 
    toggleLoginModal();
    setAlert(`Login to get access to ${name}`)
  }

  return(
  <Route 
    { ...rest }
    render={props => !isAuthenticated && !isLoading 
      ? 
        <Redirect to='/private' push={true} />
      :
        (<Component {...props} />)
    }
  />
)}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { toggleLoginModal, setAlert })(PrivateRoute);
