import React from 'react';
import Favorites from '../../features/Favorites/FavoritesContainer';
import PageTitle from '../../common/PageTitle/PageTitle';

import './FavoritePage.scss';

const FavoritesPage = () => (
  <div className="favorites-page">
    <PageTitle>Favorite products</PageTitle>
    <Favorites />
  </div>
);

export default FavoritesPage;
