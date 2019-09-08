import { connect } from 'react-redux';
import Basket from './Basket';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps)(Basket);
