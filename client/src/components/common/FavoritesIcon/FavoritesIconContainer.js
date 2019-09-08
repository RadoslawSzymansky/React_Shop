import { connect } from 'react-redux';

import FavoritesIcon from './FavoritesIcon';

const mapStateToProps = (state) => ({
  auth: state.auth,
  favorites: state.user.favorites,
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps)(FavoritesIcon);
