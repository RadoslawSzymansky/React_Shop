import { connect } from 'react-redux';
import { getProducts, getPages, getProductsRequest, fetchProductsByPage } from '../../../redux/productsRedux';

import Products from './Products';

const mapStateToProps = state =>({
  products: getProducts(state),
  pages: getPages(state),
  productsRequest: getProductsRequest(state),
  curPage: state.products.presentPage
});

const mapDispatchToProps = dispatch => ({
  fetchProductsByPage: (page, postsPerPage) => dispatch(fetchProductsByPage(page, postsPerPage, {})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);