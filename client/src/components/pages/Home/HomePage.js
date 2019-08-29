import React from 'react';
import './HomePage.scss';
import Products from '../../features/Products/ProductsContainer';

const Home = () => {
  return (
    <div className='home-page'>
      <Products />
    </div>
  );
};

export default Home;
