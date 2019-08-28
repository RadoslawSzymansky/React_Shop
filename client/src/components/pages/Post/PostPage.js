import React from 'react';

import SinglePost from '../../features/SinglePost/SinglePostContainer';

const PostPage = ({ match }) => {
  const { id } = match.params;

  return (
    <div>
      <SinglePost id={id} />
    </div>
  );
};

export default PostPage;