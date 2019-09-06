import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import history from './utils/history';

import App from './App';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import './styles/global.scss';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('app')
);