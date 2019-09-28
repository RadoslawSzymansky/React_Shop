/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  FaRegThumbsDown, FaRegThumbsUp,
} from 'react-icons/all';

const CommentsList = ({
  comments, isAuthenticated, setAlert, login, like, unLike, match, opinionId, userId, deleteC, _id
}) => (
  <ul className="comments-list">
    {comments.map((comment) => (
      <li key={comment._id} className="comment">
        <div className="row">
          <div className="col-2 col-sm-1">
            <img className="img-comment" src={comment.avatar} alt="user" />
          </div>
          <div className="col-9 col-sm-10">
            <p className="name">
              <span className="name-wrap">{comment.name}</span>
              <FaRegThumbsUp
                className="like-action"
                onClick={() => {
                  if (!isAuthenticated) {
                    setAlert('Login to like opinion', 'warning');
                    return login();
                  }
                  return like(match.params.id, opinionId, comment._id);
                }}
              />
              <span className="like">{comment.likes.length}</span>
              <FaRegThumbsDown
                className="like-action"
                onClick={() => {
                  if (!isAuthenticated) {
                    setAlert('Login to unlike opinion', 'warning');
                    return login();
                  }
                  return unLike(match.params.id, opinionId, comment._id);
                }}
              />
            </p>
            <p className="text">{comment.text}</p>
          </div>
        </div>
        { userId === comment.userId
          ? (
            <button
              type="button"
              className="btn-delete"
              outline
              color="danger"
              onClick={() => deleteC(match.params.id, opinionId, comment._id)}
            >
              Delete comment
            </button>
          )
          : null }
      </li>
    ))}
  </ul>
);

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  like: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  deleteC: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  opinionId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withRouter(CommentsList);
