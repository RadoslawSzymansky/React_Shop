import { connect } from 'react-redux';
import AuthModal from './AuthModal';

import { registerUserRequest, toggleRegisterModal } from '../../../../redux/authRedux';

const mapStateToProps = (state) => ({
  isOpen: state.auth.registerModal,
});

export default connect(mapStateToProps, {
  sendFormData: registerUserRequest, toggleModal: toggleRegisterModal,
})(AuthModal);
