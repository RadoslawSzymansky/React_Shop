import { connect } from 'react-redux';
import { likeOpinion, unLikeOpinion, commentOpinion } from '../../../redux/productsRedux';
import { setAlert } from '../../../redux/alertsRedux';
import { toggleLoginModal } from '../../../redux/authRedux';

import Opinion from './Opinion';

const mapDispatchToProps = (dispatch) => ({
  like: (productId, opinionId) => dispatch(likeOpinion(productId, opinionId)),
  unLike: (productId, opinionId) => dispatch(unLikeOpinion(productId, opinionId)),
  login: () => dispatch(toggleLoginModal()),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
  comment: (formData, productId, opinionId) => dispatch(commentOpinion(formData, productId, opinionId)),
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Opinion);
