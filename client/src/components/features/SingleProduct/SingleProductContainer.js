import { connect } from 'react-redux';

import SingleProduct from './SingleProduct';
import { fetchSingleProductRequest, getSingleProduct, getSingleProductRequest } from '../../../redux/productsRedux';
 
const mapStateToProps = state => ({
  product: getSingleProduct(state),
  request: getSingleProductRequest(state)
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: (id) => dispatch(fetchSingleProductRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);