import { connect } from 'react-redux';
import { getAuth } from '../../../redux/authRedux';

import NavLinks from './NavLinks';

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps)(NavLinks);
