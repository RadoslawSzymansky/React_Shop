import React from 'react';
import SortWidget from '../../common/SortWidget/SortWidget';

const Products = () => {
  return (
    <>
      <aside className='home-page__sidebar'>
        <SortWidget onClick={(e) => console.dir(e)}/>
      </aside>
      <div className="home-page__content">
        LISTA
      </div>
    </>
  );
};

export default Products;
