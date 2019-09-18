/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { Alert } from 'reactstrap';
import {
  FaStar, FaRegThumbsDown, FaRegThumbsUp, FiArrowDown, FiArrowUp,
} from 'react-icons/all';

import CommentsList from '../CommentsList/CommentsListContainer';

import './Opinion.scss';

const Opinion = (
  {
    opinion: {
      likes, name, text, avatar, rate, date, _id, comments,
    },
    like, unLike, match, isAuthenticated, setAlert, login, comment,
  },
) => {
  const productId = match.params.id;

  const [isCommentForm, setCommentForm] = useState(false);
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const [form, setForm] = useState({ text: '', name: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addComment = (e) => {
    e.preventDefault();
    if (!form.name || !form) return setError('Name and text  required');
    setCommentForm(false);
    return comment(form, productId, _id);
  };

  useEffect(() => {
    if (error) setTimeout(() => setError(''), 1500);
  }, [error]);

  const rates = [];
  for (let i = 0; i < rate; i++) {
    rates.push('');
  }

  return (
    <div className="row opinion">
      <div className="col-2 img-wrap">
        <img className="img-thumbnail img-user" src={avatar} alt="user" />
      </div>
      <div className="col-10">
        <div className="o-header">
          <div className="name">{name}</div>
          <div className="rates">
            {rates.map((e, i) => <FaStar key={i} color="goldenrod" />)}
            <span className="rate">
              {rate}
              /5
            </span>
          </div>
          <div className="date d-none d-sm-block">
            Added on
            {' '}
            <Moment format="YYYY/MM/DD">{date}</Moment>
          </div>
        </div>
        <div className="opinion-text">{text}</div>
      </div>
      <div className="add-comment">
        <div className="likes">
          <button
            type="button"
            className="show-comments"
            onClick={() => setCommentsOpen(!isCommentsOpen)}
          >
            Show Comments
            (
            {comments.length}
            )
            {isCommentsOpen ? <FiArrowUp /> : <FiArrowDown />}
          </button>
          <FaRegThumbsUp
            className="like-action"
            onClick={() => {
              if (!isAuthenticated) {
                setAlert('Login to like opinion', 'warning');
                return login();
              }
              return like(productId, _id);
            }}
          />
          <span className="like">{likes.length}</span>
          <FaRegThumbsDown
            className="like-action"
            onClick={() => {
              if (!isAuthenticated) {
                setAlert('Login to unlike opinion', 'warning');
                return login();
              }
              return unLike(productId, _id);
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                setAlert('Login to comment opinion', 'warning');
                return login();
              }
              return setCommentForm(!isCommentForm);
            }}
          >
            Comment
          </button>
        </div>
      </div>
      { isCommentForm ? (
        <form className="comment-form" onSubmit={(e) => addComment(e)}>
          Add Comment:
          <br />
          <textarea value={form.text} onChange={onChange} name="text" id="text-area" rows="3" />
          <br />
          <input value={form.name} onChange={onChange} name="name" placeholder="Name" />
          <button className="btn-add" type="submit">Comment</button>
          {error ? <Alert color="danger">{error}</Alert> : null}
        </form>
      ) : ''}
      <div className="col-12">
        {isCommentsOpen ? <CommentsList comments={comments} opinionId={_id} /> : null}
      </div>
    </div>
  );
};

Opinion.propTypes = {
  opinion: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired,
};

export default withRouter(Opinion);
