import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const SearchBar = ({ sortProducts }) => {
  const [search, setSearch] = useState('');
  const [timeOut, changeTimeOut] = useState('');

  const onChange = (e) => {
    clearTimeout(timeOut);
    setSearch(e.target.value);
    changeTimeOut(setTimeout(() => sortProducts({ search }), 700));
  };

  return (
    <div className="searchBar">
      <Input onChange={onChange} type="text" placeholder="Search product" />
    </div>
  );
};

SearchBar.propTypes = {
  sortProducts: PropTypes.func.isRequired,
};

export default SearchBar;
