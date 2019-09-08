import { connect } from 'react-redux';
import { getPurchasedProductsRequest } from '../../../../redux/userRedux';

import UserStoryRandom from './UserStoryRandom';

const mapStateToProps = state => ({
  user: state.user,
  isLoading: state.user.isLoading,
  purchasedHistory: state.user.purchasedHistory,
  purchasedProducts: state.user.purchasedProducts
});

const mapDispatchToProps = dispatch => ({ 
  getProducts: () => dispatch(getPurchasedProductsRequest()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryRandom);