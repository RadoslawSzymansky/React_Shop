import { connect } from 'react-redux';
import AuthModal from './AuthModal';

import { loginUserRequest, toggleLoginModal } from '../../../../redux/authRedux';

const mapStateToProps = state => ({
  isOpen: state.auth.loginModal
});

export default connect(mapStateToProps, { sendFormData: loginUserRequest, toggleModal: toggleLoginModal })(AuthModal);