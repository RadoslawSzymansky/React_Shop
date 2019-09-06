import { connect } from 'react-redux';

import Favorites from './Favorites';
import { fetchSingleToFavoritesRequest } from '../../../redux/productsRedux';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  favorites: state.user.favorites,
  favoriteProducts: state.products.favoriteProducts,
  isLoading: state.products.singleProductRequest.pending,
  userLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: (id) => dispatch(fetchSingleToFavoritesRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);