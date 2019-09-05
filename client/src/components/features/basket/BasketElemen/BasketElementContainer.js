import { connect } from 'react-redux';
import { fetchSingleToBasketRequest } from '../../../../redux/productsRedux';
import { removeFromBasketRequest, addToBasketRequest } from '../../../../redux/userRedux';

import BasketElement from './BasketElement';

const mapStateToProps = state =>({
  basketProducts: state.products.basketProducts,
  userCode: state.user.code
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchSingleToBasketRequest(id)),
  removeProduct: id => dispatch(removeFromBasketRequest(id)),
  basketAction: product => dispatch(addToBasketRequest(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketElement);