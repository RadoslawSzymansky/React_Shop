import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import './styles/global.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);