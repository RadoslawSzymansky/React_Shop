import React from 'react';
import PropTypes from 'prop-types';

import './PageTitle.scss';

const PageTitle = ({ children }) => <h3 className="page-title">{children}</h3>;

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitle;
