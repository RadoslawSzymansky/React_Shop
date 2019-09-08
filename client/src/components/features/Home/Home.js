import React from 'react';
import SortWidget from '../SortWidget/SortWidgetContainer';
import Products from '../Products/ProductsContainer';

const Home = () => (
  <>
    <aside className="home-page__sidebar">
      <SortWidget />
    </aside>
    <div className="home-page__content">
      <Products />
    </div>
  </>
);

export default Home;
