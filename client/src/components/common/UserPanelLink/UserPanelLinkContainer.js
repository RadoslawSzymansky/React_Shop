import { connect } from 'react-redux';
import { getAuth } from '../../../redux/authRedux';

import UserPanelLink from './UserPaneLink';

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps)(UserPanelLink);
