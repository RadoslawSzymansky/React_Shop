import { connect } from 'react-redux';
import { deleteAccountRequest } from '../../../../redux/authRedux';

import UserSettings from './UserSettings';


const mapDispatchToProps = (dispatch) => ({
  deleteUser: () => dispatch(deleteAccountRequest()),
});

export default connect(null, mapDispatchToProps)(UserSettings);
