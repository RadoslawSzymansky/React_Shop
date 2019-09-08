import { connect } from 'react-redux';

import BasketIcon from './BasketIcon';

const mapStateToProps = (state) => ({
  auth: state.auth,
  products: state.user.basket,
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps)(BasketIcon);
