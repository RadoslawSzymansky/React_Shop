import { connect } from 'react-redux';
import SearchBar from './SearchBar';

import { fetchProductsByPage } from '../../../redux/productsRedux';

const mapDispatchToProps = (dispatch) => ({
  sortProducts: (options) => dispatch(fetchProductsByPage(1, 10, options)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
