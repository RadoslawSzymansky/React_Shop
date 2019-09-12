import React from 'react';
import SortWidget from '../SortWidget/SortWidgetContainer';
import Products from '../Products/ProductsContainer';
import SearchBar from '../SearchBar/SearchBarContainer';

const Home = () => (
  <>
    <aside className="home-page__sidebar">
      <SortWidget />
    </aside>
    <div className="home-page__content">
      <SearchBar />
      <Products />
    </div>
  </>
);

export default Home;
