import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PageTitle from '../../common/PageTitle/PageTitle';
import UserPanelNavi from '../../features/user-panel/UserPanelNavi/UserPanelNavi';
import UserSettings from '../../features/user-panel/UserSettings/UserSettingsContainer';
import UserStoryRandom from '../../features/user-panel/UserStoryRandom/UserStoryRandomContainer';
import UserShoppingHistory from '../../features/user-panel/UserShoppingHistory/UserShoppingHistory';
import Basket from '../../features/basket/Basket/BasketContainer';
import Favorites from '../../features/Favorites/FavoritesContainer';
import NotFound from '../NotFound/NotFoundPage';
import { Link } from 'react-router-dom';

import './UserPanel.scss';

const UserPanel = ({ user : { name, avatar }}) => (
  <div className='user-panel'>
    <div className='profile-name'>
      <Link to='/user-panel'>
        <PageTitle ><img className='profile-img' src={avatar} alt="photo" /> {name}</PageTitle>
      </Link>
    </div>
    <UserPanelNavi />
    <div className="user_panel-content">
      <Switch>
        <Route path='/user-panel/' exact component={UserStoryRandom} />
        <Route path='/user-panel/settings' exact component={UserSettings} />
        <Route path='/user-panel/shopping-history' exact component={UserShoppingHistory} />
        <Route path='/user-panel/basket' exact component={Basket} />
        <Route path='/user-panel/favorites' exact component={Favorites} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default UserPanel;
