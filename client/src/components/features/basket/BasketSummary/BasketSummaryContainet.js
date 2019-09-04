import { connect } from 'react-redux';
import BasketSummary from './BasketSummary';
import { addDiscountCode } from '../../../../redux/userRedux';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  code: state.user.code
});

const mapDispatchToProps = dispatch => ({
  addCode: (code) => dispatch(addDiscountCode(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketSummary);