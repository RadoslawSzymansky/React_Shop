import React from 'react';
import { Link } from 'react-router-dom';
import { FaSprayCan } from 'react-icons/fa';

import './Logo.scss';

const Logo = () => (
  <Link to='/'>
    <h3 className="logo">
      Auto Plast Product <FaSprayCan style={{ color: '#3498db' }} />
    </h3>
  </Link>
);

export default Logo;
