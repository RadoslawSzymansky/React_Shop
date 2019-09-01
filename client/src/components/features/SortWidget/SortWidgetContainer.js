import { connect } from 'react-redux';
import SortWidget from './SortWidget';

import { fetchSortedProductsRequest } from '../../../redux/productsRedux';

const mapDispatchToProps = dispatch => ({
  sortProducts: (options) => dispatch(fetchSortedProductsRequest(options))
});

export default connect(null, mapDispatchToProps)(SortWidget);