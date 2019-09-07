import { connect } from 'react-redux';

import UserSettings from './UserSettings';

const mapStateToProps = state => ({ 
  user: state.user
});

const mapDispatchToProps = dispatch => ({ 
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);