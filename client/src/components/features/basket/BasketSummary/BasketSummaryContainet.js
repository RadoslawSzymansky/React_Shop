import { connect } from 'react-redux';
import BasketSummary from './BasketSummary';
import { addDiscountCode, getBasketValue } from '../../../../redux/userRedux';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  code: state.user.code,
  totalPrice: state.user.basketValue
});

const mapDispatchToProps = dispatch => ({
  addCode: (code) => dispatch(addDiscountCode(code)),
  getPrice: () => dispatch(getBasketValue())
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketSummary);