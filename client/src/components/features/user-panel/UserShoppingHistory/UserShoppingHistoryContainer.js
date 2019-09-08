import { connect } from 'react-redux';
import { getPurchasedProductsRequest } from '../../../../redux/userRedux';

import UserShoppingHistory from './UserShoppingHistory';

const mapStateToProps = (state) => ({
  products: state.user.purchasedProducts,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getPurchasedProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShoppingHistory);
