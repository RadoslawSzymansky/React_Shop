import { connect } from 'react-redux';
import SortWidget from './SortWidget';

import { fetchProductsByPage } from '../../../redux/productsRedux';

const mapDispatchToProps = dispatch => ({
  sortProducts: (options) => dispatch(fetchProductsByPage(1, 10, options))
});

export default connect(null, mapDispatchToProps)(SortWidget);