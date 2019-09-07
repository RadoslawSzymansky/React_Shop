import { connect } from 'react-redux';

import UserPanel from './UserPanel';

const mapStateToProps = state => ({ 
  user: state.user
});

export default connect(mapStateToProps)(UserPanel);