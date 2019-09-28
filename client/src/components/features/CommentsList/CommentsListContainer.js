/* eslint-disable no-underscore-dangle */
import { connect } from 'react-redux';
import { likeCommentOpinion, unLikeCommentOpinion, deleteCommentOpinion } from '../../../redux/productsRedux';
import { setAlert } from '../../../redux/alertsRedux';
import { toggleLoginModal } from '../../../redux/authRedux';


import CommentsList from './CommentsList';

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.isAuthenticated ? state.auth.user._id : 0,
});

const mapDispatchToProps = (dispatch) => ({ 
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
  login: () => dispatch(toggleLoginModal()),
  like: (productId, oId, cId) => dispatch(likeCommentOpinion(productId, oId, cId)),
  unLike: (productId, oId, cId) => dispatch(unLikeCommentOpinion(productId, oId, cId)),
  deleteC: (productId, oId, cId) => dispatch(deleteCommentOpinion(productId, oId, cId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
