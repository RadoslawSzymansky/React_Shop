import { connect } from 'react-redux';
import BasketSummary from './BasketSummary';
import { addDiscountCode, getBasketValue } from '../../../../redux/userRedux';
import { toggleLoginModal } from '../../../../redux/authRedux';
import { setAlert } from '../../../../redux/alertsRedux';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  code: state.user.code,
  totalPrice: state.user.basketValue,
});

const mapDispatchToProps = dispatch => ({
  addCode: (code) => dispatch(addDiscountCode(code)),
  getPrice: () => dispatch(getBasketValue()),
  setAlert: (msg, text) => dispatch(setAlert(msg, text)),
  openModal: () => dispatch(toggleLoginModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketSummary);