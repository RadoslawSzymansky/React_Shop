/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import store from './redux/store';
import history from './utils/history';

import App from './App';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import './styles/global.scss';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <LocalizeProvider>
        <App />
      </LocalizeProvider>
    </Provider>
  </Router>,
  document.getElementById('app'),
);
