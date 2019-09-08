import { connect } from 'react-redux';
import { changeNameRequest, changeEmailRequest, changePasswordRequest } from '../../../../redux/authRedux';

import UserSettingsForm from './UserSettingsForm';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  changeName: (form) => dispatch(changeNameRequest(form)),
  changePassword: (form) => dispatch(changePasswordRequest(form)),
  changeEmail: (form) => dispatch(changeEmailRequest(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsForm);
