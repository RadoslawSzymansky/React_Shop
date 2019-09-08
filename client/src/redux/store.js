/* eslint-disable no-underscore-dangle */
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

// import reducers
import products from './productsRedux';
import auth from './authRedux';
import alerts from './alertsRedux';
import user from './userRedux';

// combine reducers
const rootReducer = combineReducers({
  products,
  auth,
  alerts,
  user,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
export default store;
