import { connect } from 'react-redux';
import { addToFavoritesRequest, removeFromFavoritesRequest } from '../../../redux/userRedux';

import Favorite from './Favorite';

const mapStateToProps = state => ({
  favorites: state.user.favorites,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch => ({
  addFavorite: (productId) => dispatch(addToFavoritesRequest(productId)),
  removeFavorite: (productId) => dispatch(removeFromFavoritesRequest(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);