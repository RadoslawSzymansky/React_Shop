/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { FaStar, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/all';
import './Opinion.scss';

const Opinion = (
  {
    opinion: {
      likes, name, text, avatar, rate, date, _id,
    },
    like, unLike, match, isAuthenticated, setAlert, login,
  },
) => {
  const commentId = match.params.id;

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
            {rates.map(() => <FaStar color="goldenrod" />)}
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
          <FaRegThumbsUp
            className="like-action"
            onClick={() => {
              if (!isAuthenticated) {
                setAlert('Login to like opinion', 'warning');
                return login();
              }
              return like(commentId, _id);
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
              return unLike(commentId, _id);
            }}
          />
          <button type="button">Comment</button>
        </div>
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
};

export default withRouter(Opinion);
