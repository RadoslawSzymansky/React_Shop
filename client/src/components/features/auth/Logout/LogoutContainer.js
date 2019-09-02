import { connect } from 'react-redux';
import { logout } from '../../../../redux/authRedux';

import Logout from './Logout';

export default connect(null, { logout })(Logout);