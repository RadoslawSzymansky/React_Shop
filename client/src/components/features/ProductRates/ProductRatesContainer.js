import { connect } from 'react-redux';
import {
  fetchOpinion,
  addOpinion,
} from '../../../redux/productsRedux';
import { setAlert } from '../../../redux/alertsRedux';
import { toggleLoginModal } from '../../../redux/authRedux';


import ProductRates from './ProductRates';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  product: state.products.opinionProduct,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchOpinion(id)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
  toggleLogin: () => dispatch(toggleLoginModal()),
  addOpinion: (formData, productId) => dispatch(addOpinion(formData, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductRates);
