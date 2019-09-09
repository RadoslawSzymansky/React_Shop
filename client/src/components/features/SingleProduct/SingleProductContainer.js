import { connect } from 'react-redux';

import SingleProduct from './SingleProduct';
import { fetchSingleProductRequest, getSingleProduct, getSingleProductRequest } from '../../../redux/productsRedux';
import { addToBasketRequest } from '../../../redux/userRedux';
import { setAlert } from '../../../redux/alertsRedux';

const mapStateToProps = (state) => ({
  product: getSingleProduct(state),
  request: getSingleProductRequest(state),
  basket: state.user.basket,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchSingleProductRequest(id)),
  addToBasket: (id) => dispatch(addToBasketRequest(id)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
